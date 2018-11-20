export default async function loadData() {
  const data = await Promise.all([
    fetch("/map.csv", {
      credentials: "same-origin",
    }).then(r => r.text()),
    fetch("/mapimage.csv", {
      credentials: "same-origin",
    }).then(r => r.text()),
  ]);
  
  const csv = data[0]
    .split("\n")
    .map(d => d.split(",").map(dd => dd.trim()))
    .filter(d => d.length > 0);

  const csvMapdata = data[1]
    .split("\n")
    .map(d => d.split(",").map(dd => dd.trim()))
    .filter(d => d.length > 0);

    
  return{
    data: csv.map<Data>((d, i) => ({
      id: i.toString(),
      image: `images/1.svg`,
      regionName_jp: d[0],
      regionName_en: d[1],
      regionName_h: d[2],
      year: d[3],
      person: d[4],
      bible: d[5],
      lat: parseFloat(d[6]),
      lon: parseFloat(d[7]),
  })),
  Mapdata: csvMapdata.map<MapData>((d, i) => ({
      id: i.toString(),
      image: `images/1.svg`,
      name: d[0],
      begin: d[1],
      end: d[2],
      lat: parseFloat(d[6]),
      lon: parseFloat(d[7]),
      lat1: parseFloat(d[6]),
      lon1: parseFloat(d[7]),
    })),
  };
}