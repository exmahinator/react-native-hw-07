import React from "react";

import {
  MapScreenContainer,
  MapScreenView,
  MapScreenMarker,
} from "../../ui/main";

export default function MapScreen({ route }) {
  console.log("Info from route:", route);
  const { latitude, longitude } = route.params;
  console.log("Latitude at MapScreen:", latitude);
  console.log("Longitude at MapScreen:", longitude);
  return (
    <MapScreenContainer>
      <MapScreenView
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
        <MapScreenMarker coordinate={{ latitude, longitude }}></MapScreenMarker>
      </MapScreenView>
    </MapScreenContainer>
  );
}
