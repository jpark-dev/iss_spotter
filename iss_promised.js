const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org2?format=json');
};

const fetchMyCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`)
}

const fetchISSFlyOverTimes = (body) => {
  const { latitude, longitude } = JSON.parse(body).data;

  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;

  return request(url);
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchMyCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    })
}



module.exports = { nextISSTimesForMyLocation };
