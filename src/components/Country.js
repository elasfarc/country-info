import React from "react";
import {
  Link,
  useParams,
  useRouteMatch,
  Route,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as entitiesActions from "../store/entities";
import City from "./City";
import { v4 as uuidv4 } from "uuid";
import LocationWeather from "./LocationWeather";

const Country = () => {
  const { country: countryName } = useParams();
  const { url, path } = useRouteMatch();
  const dispatch = useDispatch();

  const country = useSelector((state) =>
    state.entities.countries.find((country) => country?.name === countryName)
  );
  const { isLoading } = useSelector((state) => state.entities);

  const isReady = React.useRef(false);

  if (country && !isReady.current) isReady.current = true;

  React.useEffect(() => {
    console.log("if !country useEffect");
    if (!country) {
      console.log("if !country useEffect INSIDE THE IF STATMENT");
      console.log("country", country);
      dispatch(entitiesActions.loadCountryData(countryName));
      // console.log("will change .current");
    }
  }, []);

  React.useEffect(() => {
    console.log("why in the fuck");
    if (country && !country?.states) {
      console.log("how many times u gonna dispatch");
      console.log("country", country);
      dispatch(entitiesActions.getCountryStates(countryName));
    }
  }, [isReady.current]);

  // const {
  //   state: { name, flag, currency, capital },
  // } = useLocation();

  if (isLoading || !country) return <h1>.....LOADING</h1>;
  const { name, flag, currency, capital } = country;
  return (
    <div className="home">
      <div className="box mb-1">
        <div className="container flex gap-2 cross-center">
          <img src={flag} alt="" className="box__img" />
          <div className="text-center">
            <h4 className="box__heading">{name}</h4>
            <p className="box__text">Capital: {capital}</p>
            <p className="box__text">Currency: {currency}</p>
          </div>
        </div>
      </div>
      {country.states ? (
        <div className="cities">
          {country.states.map(({ name: cityName, mapUrl, state, latLng }) => (
            <City
              key={uuidv4()}
              cityInfo={{ countryName, cityName, mapUrl, state, latLng }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Country;
