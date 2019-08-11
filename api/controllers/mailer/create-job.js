module.exports = async function (req, res) {
  try {
    const jobData = req.allParams();
    let pickupTimezone = jobData.pickup.time_zone ? jobData.pickup.time_zone : 'EST';
    if (pickupTimezone === 'CEN') { pickupTimezone = 'CST' }
    if (pickupTimezone === 'PAC') { pickupTimezone = 'PST' }
    let deliveryTimezone = jobData.delivery.time_zone ? jobData.delivery.time_zone : 'EST';
    if (deliveryTimezone === 'CEN') { deliveryTimezone = 'CST' }
    if (deliveryTimezone === 'PAC') { deliveryTimezone = 'PST' }
    let pickupDate = sails.helpers.stringToDate(jobData.pickup.date + ' ' + pickupTimezone);
    if (!pickupDate) {
      pickupDate = new Date().toISOString();
    }

    if (!jobData.delivery.city || !jobData.pickup.city) {
      throw "No delivery or pickup city";
    }

    let job = {
      dateReceived: sails.helpers.stringToDate(jobData.received),
      dateExpires: sails.helpers.stringToDate(jobData.expires + ' EST'),
      carType: jobData.carType,
      distance: jobData.distance,
      weight: jobData.weight,
      pieces: jobData.pieces,
      dims: jobData.dims,
      stackable: jobData.stackable == 'Yes',
      hazardous: jobData.hazardous == 'Yes',
      fastLoad: jobData.fast_load == 'Yes',
      dockLevel: jobData.dock_level == 'Yes',
      postedEmail: jobData.reply_email,
      postedBy: jobData.postedBy,
      mailId: jobData.uid,
      notes: jobData.notes,
      pickupIndex: jobData.pickup.index,
      pickupState: jobData.pickup.state,
      pickupCity: jobData.pickup.city,
      pickupDate: pickupDate,
      deliveryIndex: jobData.delivery.index,
      deliveryState: jobData.delivery.state,
      deliveryCity: jobData.delivery.city,
      deliveryDate: sails.helpers.stringToDate(jobData.delivery.date + ' ' + deliveryTimezone),
      price: jobData.pays,
      orderNumber: jobData.order,
    };

    var pickupAddress = jobData.pickup.state + '+' + jobData.pickup.city;
    if (jobData.pickup.index) {
      pickupAddress = jobData.pickup.index + '+' + pickupAddress;
    }

    let pickupCoords = coordsCache.get(pickupAddress);
    if (pickupCoords) {
      job.pickupLat = pickupCoords.lat;
      job.pickupLon = pickupCoords.lon;

      let model = await Job.create(job).fetch();
      console.log('Сoords from cache. jobId: ', model.id);

      return res.json(model);
    } else {
      let model = await Job.create(job).fetch();

      findCoordsQueue.add({
        jobId: model.id,
        pickupAddress: pickupAddress
      });

      return res.json(model);
    }
  } catch (err) {
    console.error(new Date().toUTCString());
    console.error('request body', req.body);
    return res.serverError(err);
  }
}
