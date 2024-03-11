import React, { useState, useEffect } from "react";
import "../../style.css";

const { kakao } = window;

const MedicineMap = () => {
  const initialPositions = [
    {
      title: "내당1동행정복지센터",
      subregion: "서구",
      location: "대구 서구 서대구로4길 35",
      mapy: 35.8606528,
      mapx: 128.5607254,
    },
    {
      title: "내당2.3동행정복지센터",
      subregion: "서구",
      location: "대구 서구 큰장로15길 11-1",
      mapy: 35.86727528,
      mapx: 128.5745324,
    },
    {
      title: "내당4동행정복지센터",
      subregion: "서구",
      location: "대구 서구 서대구로3길 46",
      mapy: 35.85902046,
      mapx: 128.5518433,
    },
    {
      title: "성당동행정복지센터",
      subregion: "달서구",
      location: "대구 달서구 야외음악당로 38",
      mapy: 35.84061406,
      mapx: 128.553148605562,
    },
    {
      title: "두류1.2동행정복지센터",
      subregion: "달서구",
      location: "대구 달서구 두류길 141-8",
      mapy: 35.8577731987934,
      mapx: 128.567278500004,
    },
    {
      title: "두류3동행정복지센터",
      subregion: "달서구",
      location: "대구 달서구 야외음악당로39길 24",
      mapy: 35.8537053598211,
      mapx: 128.55547533284,
    },
  ];
  const [map, setMap] = useState(null);
  const [positions, setPositions] = useState(initialPositions);

  useEffect(() => {
    const container = document.getElementById("map");

    const options = {
      center: new kakao.maps.LatLng(35.8606528, 128.5607254),
      level: 6,
    };
    const mapObj = new kakao.maps.Map(container, options);
    setMap(mapObj);

    initialPositions.forEach((position) => {
      const markerPosition = new kakao.maps.LatLng(
        position.mapy,
        position.mapx
      );
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: new kakao.maps.MarkerImage(
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
          new kakao.maps.Size(24, 35)
        ),
        title: position.title,
      });

      marker.setMap(mapObj);

      kakao.maps.event.addListener(marker, "click", () => {
        mapObj.setCenter(marker.getPosition());
        const showWindow = new kakao.maps.InfoWindow({
          content: `<div>${position.title}`,
        });
        showWindow.open(mapObj, marker);
      });
    });
  }, []);

  const toggleMarker = (subregion) => {
    const filterPosition = initialPositions.filter(
      (position) => position.subregion === subregion
    );
    setPositions(filterPosition);
    if (filterPosition.length > 0) {
      const center = new kakao.maps.LatLng(
        initialPositions[0].mapy,
        initialPositions[0].mapx
      );
      map.panTo(center);
    }
  };

  return (
    <div className="NotDrag">
      <h2>대구시의 폐의약품 위치입니다</h2>
      <div id="map" style={{ width: "500px", height: "500px" }}></div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridGap: "10px",
        }}
      >
        <button onClick={() => toggleMarker("서구")}>서구</button>
        <button onClick={() => toggleMarker("달서구")}>달서구</button>
        {positions.map((position) => (
          <div
            key={position.title}
            style={{
              border: "solid #c8c8c8",
              cursor: "pointer",
            }}
          >
            <p>{position.title}</p>
            <p>{position.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicineMap;
