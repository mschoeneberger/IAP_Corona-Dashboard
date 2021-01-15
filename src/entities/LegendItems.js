import LegendItem from "./LegendItem";

const legendItemsCCases = [
    new LegendItem(
        "5.000.000+",
        "#330000",
        (cases) => cases >= 5_000_000,
        "white"
    ),
    new LegendItem(
        "2.500.000 - 4.999.999",
        "#660000",
        (cases) => cases >= 2_500_000 && cases < 5_000_000,
        "white"
    ),
    new LegendItem(
        "1.000.000 - 2.499.999",
        "#990000",
        (cases) => cases >= 1_000_000 && cases < 2_500_000
    ),
    new LegendItem(
        "500.000 - 999.999",
        "#e60000",
        (cases) => cases >= 500_000 && cases < 1_000_000
    ),
    new LegendItem(
        "100.000 - 499.999",
        "#ff5544",
        (cases) => cases >= 100_000 && cases < 500_000
    ),
    new LegendItem(
        "1 - 199.999",
        "#ff8080",
        (cases) => cases >= 1 && cases < 200_000
    ),
    new LegendItem("No Data", "#ffff4d", (cases) => true)
];

export default legendItemsCCases;