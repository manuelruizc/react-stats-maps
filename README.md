# react-svg-maps

[![npm](https://img.shields.io/npm/v/react-stats-maps)](https://www.npmjs.com/package/react-stats-maps)

react-stats-maps is a React.js library for dealing with svg maps, statistics and map actions.

####

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
  - [Using Map](#using-map)
  - [Using Custom Map](#using-custom-map)
- [Props](#props)
  - [colors](#colors)
  - [customLimitComparative](#customlimitcomparative)
  - [data](#data)
  - [defaultTooltipClassName](#defaulttooltipclassname)
  - [defaultTooltipStyle](#colors)
  - [limits](#limits)
  - [map](#map)
  - [onStateHover](#onstatehover)
  - [onMouseOut](#onmouseout)
  - [politicalDivision](#politicaldivision)
  - [renderCustomTooltip](#rendercustomtooltip)
  - [stateDefaultcolor](#statedefaultcolor)
  - [stateDefaultHoverColor](#statedefaulthovercolor)
  - [svgFile](#svgfile)
  - [tooltipOnClick](#tooltiponclick)
  - [usingTooltip](#usingtooltip)
- [Contributing](#contributing)

## Installation

Use the package manager [npm](https://pip.pypa.io/en/stable/) to install react-svg-map.

```bash
npm install react-svg-maps --save
```

## Usage

### Using React Stat Map

```jsx
import React from
import StatMap from "react-stats-maps";
import { USMap } from "react-stats-maps/lib/maps";

const colors = [
      "green", // none
      "yellow", // some cases
      "orange", // a lot of cases
      "red", // top of cases
    ];
const limits = ["Active Cases", "desc", [0, 25, 50, 75]]

const MapComponent = () => {
  return (
  <StatMap
    colors={color}
    limits={limits}
    data={data}
    map={USMap}
  />
);
}
```

### Using React SVG Maps

```javascript
import Map, { USMap } from "raw-dog";
import SVGComponent from "./SVGComponent.js";
const messi = document.getElementsByClassName("lio");
```

## Props

| Property                                            | Type                                    | Required | Default                     |
| --------------------------------------------------- | --------------------------------------- | -------- | --------------------------- |
| [colors](#colors)                                   | string[]                                | Yes      | []                          |
| [customLimitComparative](#customlimitcomparative)   | function                                | No       | null                        |
| [data](#data)                                       | array                                   | Yes      |                             |
| [defaultTooltipClassName](#defaulttooltipclassname) | string                                  | No       | ''                          |
| [defaultTooltipStyle](#defaulttooltipstyle)         | object                                  | No       | {}                          |
| [limits](#limits)                                   | array                                   | No       | []                          |
| [map](#map)                                         | React SVG Component                     | Yes      |                             |
| [onStateHover](#onstatehover)                       | function                                | No       | null                        |
| [onMouseOut](#onmouseout)                           | function                                | No       | null                        |
| [politicalDivision](#politicaldivision)             | object                                  | No       | { width: 1, color: "#222" } |
| [renderCustomTooltip](#rendercustomtooltip)         | React Component                         | No       | null                        |
| [stateDefaultColor](#statedefaultcolor)             | string                                  | No       | 'white'                     |
| [stateDefaultHoverColor](#statedefaulthovercolor)   | string                                  | No       | 'blue'                      |
| [svgFile](#svgfile)                                 | HTML SVG element or React SVG Component | No       | null                        |
| [tooltipOnClick](#tooltiponclick)                   | function                                | No       | null                        |
| [usingTooltip](#usingtooltip)                       | boolean                                 | No       | true                        |

### colors

The colors props accepts an array of strings of color codes and/or names. It will color a state depending on the limits array values and the statistics value on the data that the user provide on the prop [data](#data).

```jsx
import React from
import StatMap from "react-stats-maps";
import { USMap } from "react-stats-maps/lib/maps";


const limitsArray = [0, 25, 50];

const limits = ["Active Cases", "desc", limitsArray];

const colors = [
      "green", // if the statistics value is equal or less than 0
      "yellow", // if the statistics value is equal or less than 25
      "orange", // if the statistics value is equal or less than 50
      "red", // if the statistics value is greater than 50
    ];

const MapComponent = () => {
  return (
  <StatMap
    colors={color}
    limits={limits}
    data={data}
    map={USMap}
  />
);
}
```

The length of the colors array has to be equal or greater than the limitsArray array, in case of the two arrays been of the same length, there will not be a greater than scenario.

```jsx
import React from
import StatMap from "react-stats-maps";
import { USMap } from "react-stats-maps/lib/maps";


const limitsArray = [0, 25, 50, 75];

const limits = ["Active Cases", "desc", limitsArray];

const colors = [
      "green", // if the statistics value is equal or less than 0
      "yellow", // if the statistics value is equal or less than 25
      "orange", // if the statistics value is equal or less than 50
      "red", // if the statistics value is equal or less than 75,
             // theres no greater than color...
    ];

const MapComponent = () => {
  return (
  <StatMap
    colors={color}
    limits={limits}
    data={data}
    map={USMap}
  />
);
```

### customLimitComparative

By default the coloring of each state is defined in the limits prop array, by the label you want to evaluate on the colors prop array. When using **customLimitComparative** it ignores the limits prop array and uses the returned number to evaluate in the colors array.  
This prop accepts a function that return a number, this number should be the number that will be compared in the limitsArray. It has the object of the data of each state as a parameter.

```jsx
// imports ...
// other props declarations ...

// comparative for election
const customLimitComparative={(data) => {
  const { stateCode, statistics, totalVotes } = data;
  let maxPercentage = 0; // percentage with the most voting percentage
  let maxPercentageParty = ""; //
  for (let i = 0; i < statistics.length; i++) {
    const stat = statistics[i];
    const percentage = (100 / totalVotes) * stat.votes;
    if (i === 0) {
      maxPercentage = percentage;
      maxPercentageParty = stat.party;
      continue;
    }
    if (percentage > maxPercentage) {
      maxPercentage = percentage;
      maxPercentageParty = stat.party;
    }
  }
  // if the maxPercentage variable is equal or less than 50
     the color will be a light blue or a light red, if not
     it will have a regular red or blue color
  if (maxPercentage > 50) {
    return maxPercentageParty === "Democrat" ? 25 : 100;
  } else {
    return maxPercentageParty === "Democrat" ? 50 : 75;
  }
}}

const MapComponent = () => {
  return (
    <StatMap
      colors={color}
      customLimitComparative={customLimitComparative}
      data={data}
      map={USMap}
    />
  );
```

### data

The data is an array of all or some states in the map. The object properties are up to the developer, only a property named **stateCode** is required, that will be the state abbreviation (**AZ** for _Arizona_)

```jsx
const data = [
  {
    stateCode: "CA", // California
    // ... rest of the properties
  },
  {
    stateCode: "NY", // New York
    // ... rest of the properties
  },
  {
    stateCode: "TX", // Texas
    // ... rest of the properties
  },
];
```

Even though there is no a fixed structure for the objects of the data, there is a recommendation for a quick use of the map, and the use of the default Tooltip. Which is:

```jsx
const data = [
  {
    stateCode: "XX", // stateCode
    statistics: [
      {
        label: "xxx", // string
        value: 12345, // number
      },
    ],
  },
  {
    stateCode: "XX", // stateCode
    statistics: [
      {
        label: "xxx", // string
        value: 12345, // number
      },
    ],
  },
];
```

#### Example of the recommended data structure

```jsx
const dataCoronavirus = [
  {
    stateCode: "CA",
    statistics: [
      {
        label: "Total Cases",
        value: 3590000,
      },
      {
        label: "Deaths",
        value: 53706,
      },
    ],
    // other properties...
  },
  {
    stateCode: "TX",
    statistics: [
      {
        label: "Total Cases",
        value: 2690000,
      },
      {
        label: "Deaths",
        value: 45195,
      },
    ],
    // other properties...
  },
];
```

### defaultTooltipClassName

Sets a class name to the default tooltip to style it from css.

### defaultTooltipStyle

Sets a react style object to the default tooltip

### limits

It's an array to work with colors array when evaluating and comparing values from each state to color them.

```js
const limits = ["Total Cases", [300000, 1000000, 3000000]];

// limits [0] will be used to get that label value to
// compare with limits[1] array
```

If you're using a [**customLimitComparative**](#customlimitcomparative), limits[0] will be ignored and the value returned from your **customLimitComparative** will be the one evaluated and compared to limits[1] array

### map

This props takes a map included on the library.

```js
import StatMap from "react-stats-maps";
import { USMap } from "react-stats-maps/lib/maps";

const MyMapComponent = () => {
  return (
    <StatMap
       map={USMap}
       ...
    />
  );
};
```

### onStateHover

This function is executed on a JavaScript onmouseover event, when the mouse is over a state. It uses an object with the index (if is a custom map) and the state code as the parameter.

### onMouseOut

This function is executed on a JavaScript onmouseout event, when the mouse is out of a state. It uses an object with the index (if is a custom map) and the state code as the parameter.

### politicalDivision

It defines the color and width of the border dividing the states, it takes an object as a value

```js
const politicalDivision = { width: 1, color: "#222" };
```

### renderCustomTooltip

This props receives a React Element to use as a custom tooltip, it uses a parameter that contains the object of the hovered state in the [data](#data) array prop.

```jsx
import * as React from "react";
import StatMap from "react-stats-maps";
import CustomTooltip from "./custom-tooltip";

const MapComponent = () => {
  return (
    <StatMap
      renderCustomTooltip={(objectData) => {
        // this properties depend on the user data array structure
        const { stateCode, statistics } = objectData;
        // ... do some stuff
        return <CustomTooltip stateCode={stateCode} tooltipData={objectData} />;
      }}
    />
  );
};
```

### stateDefaultcolor

It defines the default color for a state, this could be useful, when
not all states are going to be colored.

### stateDefaultHoverColor

It defines the default color for a state when the mouse is over.

### svgFile

With this prop you can use a custom svg to use as map.

#### SVG Component

```jsx
const SVGComponent = () => {
  return (
    <svg>
      <path id="AA" />
      <path id="BB" />
      <path id="CC" />
      <path id="DD" />
    </svg>
  );
};
```

#### Map Component

```jsx
import SVGComponent from "./SVGComponent";
const MapComponent = () => {
  return (
    <StatMap
      colors={color}
      customLimitComparative={customLimitComparative}
      data={data}
      svgFile={SVGComponent}
    />
  );
};
```

### tooltipOnClick (will be renamed to onStateClick)

This function is executed on a JavaScript onclick event, when clicking on a state. It uses an object with the index (if is a custom map) and the state code as the parameter.

```js
const tooltipOnClick = ({ stateCode, index } = () => {
  // get State clicked data
  const stateClickedData = array1.find(
    (element) => element.stateCode === stateCode
  );
  const stateClickedDataWithIndex = data[index];
  // do some stuff with the data
  // maybe active a modal or go to a different page
  // is up to you :)
});
```

### usingTooltip

It defines if a tooltip will be used when the mouse is over the map.

## Contributing

We would love for you to contribute to react-stats-maps it's a library for the community. Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
