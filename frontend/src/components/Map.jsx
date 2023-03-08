import React, { Component } from 'react'
import { GoogleMap, useJsApiLoader, LoadScript } from '@react-google-maps/api';
import { Autocomplete } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api'

import schools from "../assets/schools.json"

import MediaCard from './Card';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 40.698779,
  lng: -73.887854
};

export default function Map() {
  const [schoolsData, setSchool] = React.useState([schools])
  return (
    <LoadScript
      googleMapsApiKey="ENTER_API_KEY_HERE "
      libraries={["places"]}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        clickableIcons={false}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <Autocomplete>
            <input
              type="text"
              placeholder="Search for a school"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `clamp(320px, 20%, 100%)`,
                height: `5%`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "fixed",
                left: "15px",
                top: "15px",
                zIndex: 100,
                color: "white"
              }}
            />
            </Autocomplete>
            {schoolsData && schoolsData.map((school_name) => {
              <Marker position={{
                lat: school_name.latitude,
                lng: school_name.longitude
              }}>{school_name}</Marker>
            })}
            <MediaCard />
      </GoogleMap>
    </LoadScript>
  )
}