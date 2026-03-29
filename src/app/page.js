
import HomeSlider from "./Components/HomeSlider";

import CatSlider from "./Components/CatSlider";
import Premimusmartphones  from "./Components/Premimusmartphones";
import BudgetSmartphones from "./Components/BudgetSmartphones"
import Midrangessmartphones from "./Components/Midrangessmartphones"
import  Moreexplore from "./Components/Moreexplore"
import AdBanner from "./Components/AdBanner"
import Addbaner1 from "./Components/Addbaner1"

export default function Home() {
  return (
   <>
<div className="sliderWrapper bg-[#f1f1f1] py-5">

<HomeSlider/>

</div>
    <CatSlider/>
<Addbaner1/>
<Premimusmartphones/>
<BudgetSmartphones/>
<Midrangessmartphones/>
 <Moreexplore/>
<AdBanner/>

   </>
  );
}


