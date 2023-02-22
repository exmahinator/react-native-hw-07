import React from "react";

import {
  MapScreenContainer,
  MapScreenView,
  MapScreenMarker,
} from "../../ui/main";

export default function MapScreen() {
  return (
    <MapScreenContainer>
      <MapScreenView
        initialRegion={{
          latitude: 50.450001,
          longitude: 30.523333,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
        <MapScreenMarker
          coordinate={{ latitude: 50.450001, longitude: 30.523333 }}
        ></MapScreenMarker>
      </MapScreenView>
    </MapScreenContainer>
  );
}
