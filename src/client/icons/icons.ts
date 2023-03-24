import cautionSVG from '../icons/caution.svg';
import circleStrokedSVG from '../icons/circle-stroked.svg';
import circleSVG from '../icons/circle.svg';
import constructionSVG from '../icons/construction.svg';
import crossSVG from '../icons/cross.svg'; 
import informationSVG from '../icons/information.svg'; 
import markerStroked from '../icons/marker-stroked.svg'; 
import marker from '../icons/marker.svg'; 
import roadblock from '../icons/roadblock.svg'; 
import star from '../icons/star.svg';

const svgMap: Map<string, any> = new Map();

svgMap.set("caution", cautionSVG);
svgMap.set("circle-stroked", circleStrokedSVG);
svgMap.set("circle", circleSVG);
svgMap.set("construction", constructionSVG);
svgMap.set("cross", crossSVG);
svgMap.set("information", informationSVG);
svgMap.set("marker-stroked", markerStroked);
svgMap.set("marker", marker);
svgMap.set("roadblock", roadblock);
svgMap.set("star", star);

export default svgMap;