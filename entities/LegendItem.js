class LegendItem{
    constructor(title, color, from, to, textColor){
        this.title = title;
        this.color = color;
        this.from = from;
        this.to = to;
        this.textColor = textColor != null ? textColor : "black";
    }
}

export default LegendItem;