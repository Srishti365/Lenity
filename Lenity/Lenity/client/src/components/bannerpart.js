import React from 'react';
import Logo from './banner_img.png';
import '../css/Home.css';
import '../css/style.css';


const bannerpart=()=>{
    return(
        <div>
<div class="banner_part">
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-lg-7">
                    <div class="banner_text text-center">
                        <div class="banner_text_iner">
                            <h1>Help The <br/>
                                Children in Need </h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut</p>
                            <a href="#" class="btn_2">Start Donation</a>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>

        </div>
    )
}

export default bannerpart;