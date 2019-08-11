module.exports = async function (req, res) {
  const filters = req.allParams();
  delete filters.user;

  await Setting.updateOne({ user: req.me.id }).set(filters);

  const radiusCoord = filters.filterRadius / 69;

  var sort = 'job."pickupDate"';
  switch (filters.sort) {
    case 'datePickup':
      sort = 'job."pickupDate"';
      break;
    case 'dateReceived':
      sort = 'job."createdAt"';
      break;
    case 'weight':
      sort = 'job."weight"';
      break;
    case 'distance':
      sort = 'job."distance"';
      break;
  }

  var pickupTo = new Date(filters.filterPickupTo);
  pickupTo.setTime(pickupTo.getTime() + 86400000);

  const filterCarType = req.allParams().filterCarType;
  const expiredCond = filters.filterExpired ? '' : ' and job."dateExpires" > now()';
  let carTypeCond = '';
  if (filterCarType && filterCarType.length > 0) {
    carTypeCond = `and (job."carType" LIKE '%${filterCarType.join("%' or job.\"carType\" LIKE '%")}%')`
  }
  const SQL = `
        SELECT job.*, userjob.status FROM job
        LEFT JOIN userjob ON userjob.job = job.id AND userjob.user = $1
        WHERE "pickupDate" >= $2 and "pickupDate" < $3 and "pickupLat" <= $4 and "pickupLat" >= $5
        and "pickupLon" <= $6 and "pickupLon" >= $7 and "weight" >= $8 and "weight" <= $9
        ${expiredCond}
        ${carTypeCond}
        order by $10 DESC`;
  //console.log(SQL);

  var rawResult = await sails.sendNativeQuery(SQL, [
    req.me.id,
    filters.filterPickupFrom,
    pickupTo,
    filters.filterLat + radiusCoord,
    filters.filterLat - radiusCoord,
    filters.filterLon + radiusCoord,
    filters.filterLon - radiusCoord,
    filters.filterMinWeight,
    filters.filterMaxWeight,
    sort,
  ]);

  rawResult.rows.forEach(function (element) {
    element.stackable = element.stackable ? 'Yes' : 'No';
    element.fastLoad = element.fastLoad ? 'Yes' : 'No';
    element.hazardous = element.hazardous ? 'Yes' : 'No';
    element.dockLevel = element.dockLevel ? 'Yes' : 'No';
  });

  return res.json(rawResult.rows);
}
