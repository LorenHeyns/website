/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import {
  DataPoint,
  DataGroup,
  computePlotParams,
  PlotParams,
} from "./chart/base";
import { chartTypeEnum } from "./chart/types";
import {
  drawHistogram,
  drawLineChart,
  drawSingleBarChart,
  drawStackBarChart,
  drawGroupBarChart,
  drawGroupLineChart,
} from "./chart/draw";
import { randDomId } from "./shared/util";

interface DevChartPropType {
  id: string;
  width: number;
  height: number;
  type: string;
  dataPoints?: DataPoint[];
  dataGroups?: DataGroup[];
  dataGroupsDict?: { [key: string]: DataGroup[] };
  unit?: string;
  statsVarsTitle?: { [key: string]: string };
  plotParams?: PlotParams;
}

class DevChart extends React.Component<DevChartPropType> {
  svgContainerElement: React.RefObject<HTMLDivElement>;

  constructor(props: DevChartPropType) {
    super(props);
    this.svgContainerElement = React.createRef();
  }

  render(): JSX.Element {
    return (
      <div
        className="chart"
        id={this.props.id}
        ref={this.svgContainerElement}
      ></div>
    );
  }

  componentDidMount(): void {
    const elem = this.svgContainerElement;
    elem.current.innerHTML = "";
    elem.current.style.width = this.props.width + "px";

    if (this.props.type === chartTypeEnum.LINE) {
      drawLineChart(
        this.props.id,
        elem.current.offsetWidth,
        this.props.height,
        this.props.dataGroups,
        false,
        this.props.unit
      );
    } else if (this.props.type == chartTypeEnum.SINGLE_BAR) {
      drawSingleBarChart(
        this.props.id,
        elem.current.offsetWidth,
        this.props.height,
        this.props.dataPoints,
        this.props.unit
      );
    } else if (this.props.type == chartTypeEnum.GROUP_BAR) {
      drawGroupBarChart(
        this.props.id,
        elem.current.offsetWidth,
        this.props.height,
        this.props.dataGroups,
        this.props.unit
      );
    } else if (this.props.type == chartTypeEnum.STACK_BAR) {
      drawStackBarChart(
        this.props.id,
        elem.current.offsetWidth,
        this.props.height,
        this.props.dataGroups,
        this.props.unit
      );
    } else if (this.props.type == chartTypeEnum.GROUP_LINE) {
      drawGroupLineChart(
        this.props.id,
        elem.current.offsetWidth,
        this.props.height,
        this.props.statsVarsTitle,
        this.props.dataGroupsDict,
        this.props.plotParams
      );
    } else if (this.props.type == chartTypeEnum.HISTOGRAM) {
      drawHistogram(
        this.props.id,
        elem.current.offsetWidth,
        this.props.height,
        this.props.dataPoints,
        this.props.unit
      );
    }
  }
}

class DevPage extends React.Component {
  render(): JSX.Element {
    const chartElements: JSX.Element[] = [];
    let width = 350;
    const height = 300;

    // Draw single bar chart.
    let id = randDomId();
    let dataPoints = [
      new DataPoint("San Jose", 702134),
      new DataPoint("Santa Clara County", 1002342),
      new DataPoint("California", 3002342),
      new DataPoint("United States", 9520234),
    ];
    chartElements.push(
      <DevChart
        key={id}
        id={id}
        width={width}
        height={height}
        type={chartTypeEnum.SINGLE_BAR}
        dataPoints={dataPoints}
      ></DevChart>
    );

    let dataGroups = [
      new DataGroup("Staten Island, NY", [
        new DataPoint("2011", -10000),
        new DataPoint("2012", null),
        new DataPoint("2013", -30000),
      ]),
      new DataGroup("Queens, NY", [
        new DataPoint("2011", null),
        new DataPoint("2012", 26000),
        new DataPoint("2013", 24000),
      ]),
      new DataGroup("New York, NY", [
        new DataPoint("2011", null),
        new DataPoint("2012", -25000),
        new DataPoint("2013", 22000),
      ]),
      new DataGroup("United States of America", [
        new DataPoint("2011", null),
        new DataPoint("2012", 5000),
        new DataPoint("2013", 2000),
      ]),
      new DataGroup("Very-Long City-Name", [
        new DataPoint("2011", 1000),
        new DataPoint("2012", 5000),
        new DataPoint("2013", null),
      ]),
      new DataGroup("Multi several-very long city name long", [
        new DataPoint("2011", 1000),
        new DataPoint("2012", 5000),
        new DataPoint("2013", null),
      ]),
    ];

    // Draw stack bar chart.
    id = randDomId();
    chartElements.push(
      <DevChart
        key={id}
        id={id}
        width={width}
        height={height}
        type={chartTypeEnum.STACK_BAR}
        dataGroups={dataGroups}
      ></DevChart>
    );

    // Draw group bar chart.
    id = randDomId();
    chartElements.push(
      <DevChart
        key={id}
        id={id}
        width={width}
        height={height}
        type={chartTypeEnum.GROUP_BAR}
        dataGroups={dataGroups}
      ></DevChart>
    );

    // Draw line chart.
    id = randDomId();
    chartElements.push(
      <DevChart
        key={id}
        id={id}
        width={width}
        height={height}
        type={chartTypeEnum.LINE}
        dataGroups={dataGroups}
      ></DevChart>
    );

    // Draw single bar chart with dollar values
    id = randDomId();
    chartElements.push(
      <DevChart
        key={id}
        id={id}
        width={width}
        height={height}
        type={chartTypeEnum.SINGLE_BAR}
        dataGroups={dataGroups}
        unit="$"
      ></DevChart>
    );

    // Draw group bar with long i18n names.
    dataGroups = [
      new DataGroup("スタテンアイランド, ニューヨーク州, アメリカ合衆国", [
        new DataPoint("2011", -10),
        new DataPoint("2012", null),
        new DataPoint("2013", -30),
      ]),
      new DataGroup("クイーンズ区, ニューヨーク州", [
        new DataPoint("2011", null),
        new DataPoint("2012", 2.6),
        new DataPoint("2013", 24),
      ]),
      new DataGroup("マンハッタン, ニューヨーク州", [
        new DataPoint("2011", null),
        new DataPoint("2012", -25),
        new DataPoint("2013", 22),
      ]),
      new DataGroup("マンハッタン, ニューヨーク州", [
        new DataPoint("2011", null),
        new DataPoint("2012", 50),
        new DataPoint("2013", 20),
      ]),
      new DataGroup("ブルックリン区, ニューヨーク州", [
        new DataPoint("2011", 10),
        new DataPoint("2012", 50),
        new DataPoint("2013", null),
      ]),
      new DataGroup("ブロンクス区, ニューヨーク州", [
        new DataPoint("2011", 10),
        new DataPoint("2012", 50),
        new DataPoint("2013", null),
      ]),
      new DataGroup("ニューヨーク州", [
        new DataPoint("2011", 10),
        new DataPoint("2012", 50),
        new DataPoint("2013", null),
      ]),
      new DataGroup("アメリカ合衆国", [
        new DataPoint("2011", 23.6),
        new DataPoint("2012", 24),
        new DataPoint("2013", null),
      ]),
    ];
    width = 354;
    id = randDomId();
    chartElements.push(
      <DevChart
        key={id}
        id={id}
        width={width}
        height={height}
        type={chartTypeEnum.GROUP_BAR}
        dataGroups={dataGroups}
        unit="%"
      ></DevChart>
    );

    // Draw single bar chart with percentage values
    width = 225;
    dataPoints = [
      new DataPoint("San Jose", 70.2),
      new DataPoint("Santa Clara County", 12.4),
      new DataPoint("California", 30),
      new DataPoint("United States", 95.9),
    ];
    id = randDomId();
    chartElements.push(
      <DevChart
        key={id}
        id={id}
        width={width}
        height={height}
        type={chartTypeEnum.SINGLE_BAR}
        dataGroups={dataGroups}
        unit="%"
      ></DevChart>
    );

    // Draw narrow single bar chart with potentially weird y-axis values
    width = 315;
    dataPoints = [
      new DataPoint("Enrolled in School", 510475),
      new DataPoint("Not Enrolled in School", 1341885),
    ];
    id = randDomId();
    chartElements.push(
      <DevChart
        key={id}
        id={id}
        width={width}
        height={height}
        type={chartTypeEnum.SINGLE_BAR}
        dataPoints={dataPoints}
      ></DevChart>
    );

    // Test percent and narrow chart
    dataPoints = [
      new DataPoint("San Jose", 20.2),
      new DataPoint("Santa Clara County", 22.4),
      new DataPoint("California", 23),
      new DataPoint("United States", 25.9),
    ];
    id = randDomId();
    chartElements.push(
      <DevChart
        key={id}
        id={id}
        width={width}
        height={height}
        type={chartTypeEnum.SINGLE_BAR}
        dataPoints={dataPoints}
        unit="%"
      ></DevChart>
    );

    // Test narrow group bar chart
    id = randDomId();
    chartElements.push(
      <DevChart
        key={id}
        id={id}
        width={width}
        height={height}
        type={chartTypeEnum.GROUP_BAR}
        dataGroups={dataGroups}
      ></DevChart>
    );

    // Test y-axis with small values
    dataGroups = [
      new DataGroup("label-1", [
        new DataPoint("01-01-2011", 7),
        new DataPoint("01-02-2011", 10),
      ]),
    ];
    id = randDomId();
    chartElements.push(
      <DevChart
        key={id}
        id={id}
        width={width}
        height={height}
        type={chartTypeEnum.LINE}
        dataGroups={dataGroups}
      ></DevChart>
    );

    // Draw line chart with missing values.
    dataGroups = [
      new DataGroup("label-1", [
        new DataPoint("01-01-2011", 702134),
        new DataPoint("01-02-2011", 1002342),
        new DataPoint("01-03-2011", 3002342),
        new DataPoint("01-04-2011", 9520234),
        new DataPoint("01-05-2011", 3520234),
        new DataPoint("01-06-2011", 7520234),
      ]),
      new DataGroup("label-2", [
        new DataPoint("01-01-2011", 2134),
        new DataPoint("01-02-2011", null),
        new DataPoint("01-03-2011", 2342),
        new DataPoint("01-04-2011", null),
        new DataPoint("01-05-2011", 520234),
        new DataPoint("01-06-2011", 520234),
      ]),
    ];
    id = randDomId();
    chartElements.push(
      <DevChart
        key={id}
        id={id}
        width={width}
        height={height}
        type={chartTypeEnum.LINE}
        dataGroups={dataGroups}
      ></DevChart>
    );

    // Test group line chart
    width = 450;
    const years = [
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
    ];
    const placeValue1 = {
      Total: [
        2940667,
        1952164,
        -1959400,
        1967392,
        2978048,
        2989918,
        3001345,
        3009733,
      ],
      Male: [
        1421287,
        1431252,
        1439862,
        1447235,
        1451913,
        -1456694,
        1461651,
        1468412,
      ],
    };
    const placeValue2 = {
      Total: [
        37638369,
        -37948800,
        38260787,
        38596972,
        38918045,
        39167117,
        39358497,
        39461588,
      ],
      Male: [
        18387718,
        18561020,
        18726468,
        18911519,
        19087135,
        -19200970,
        19366579,
        19453769,
      ],
    };
    const placeData1 = [];
    for (const label in placeValue1) {
      placeData1.push(
        new DataGroup(
          label,
          years.map((year, i) => new DataPoint(year, placeValue1[label][i]))
        )
      );
    }
    const placeData2 = [];
    for (const label in placeValue2) {
      placeData2.push(
        new DataGroup(
          label,
          years.map((year, i) => new DataPoint(year, placeValue2[label][i]))
        )
      );
    }

    const dataGroupsDict1: { [key: string]: DataGroup[] } = {
      Nevada: placeData1,
      California: placeData2,
    };

    id = randDomId();
    chartElements.push(
      <DevChart
        key={id}
        id={id}
        width={width}
        height={height}
        type={chartTypeEnum.GROUP_LINE}
        dataGroupsDict={dataGroupsDict1}
        statsVarsTitle={{ Total: "Total", Male: "Male" }}
        plotParams={computePlotParams(
          ["Nevada", "California"],
          ["Total", "Male"]
        )}
      ></DevChart>
    );

    const dataGroupsDict2: { [key: string]: DataGroup[] } = {
      California: placeData2,
    };

    id = randDomId();
    chartElements.push(
      <DevChart
        key={id}
        id={id}
        width={width}
        height={height}
        type={chartTypeEnum.GROUP_LINE}
        dataGroupsDict={dataGroupsDict2}
        statsVarsTitle={{ Total: "Total", Male: "Male" }}
        plotParams={computePlotParams(["California"], ["Total", "Male"])}
      ></DevChart>
    );

    const dataGroupsDict3: { [key: string]: DataGroup[] } = {
      "very very very long place name": [placeData1[0]],
      "such a long name that it needs to span 4 lines": [placeData2[0]],
    };

    id = randDomId();
    chartElements.push(
      <DevChart
        key={id}
        id={id}
        width={width}
        height={height}
        type={chartTypeEnum.GROUP_LINE}
        dataGroupsDict={dataGroupsDict3}
        statsVarsTitle={{ Total: "Total" }}
        plotParams={computePlotParams(
          [
            "very very very long place name",
            "such a long name that it needs to span 4 lines",
          ],
          ["Total"]
        )}
      ></DevChart>
    );

    dataPoints = [
      new DataPoint("San Jose", 20.2),
      new DataPoint("Santa Clara County", -22.4),
      new DataPoint("California", 23),
      new DataPoint("United States", 25.9),
    ];
    id = randDomId();
    chartElements.push(
      <DevChart
        key={id}
        id={id}
        width={width}
        height={height}
        type={chartTypeEnum.HISTOGRAM}
        dataPoints={dataPoints}
      ></DevChart>
    );

    return <>{chartElements}</>;
  }
}

export { DevPage };
