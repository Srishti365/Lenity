import React from 'react';
import servicepart from './servicepart';
import bannerpart from './bannerpart';
import Logo_1 from './Logo_2.png'
import Logo from './banner_img.png';
import '../css/Home.css';
import '../css/style.css';
import Header from './Header';


const Home =() => {
    return(
        <div>
            <Header/>
            <div class="banner_part">
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-lg-7">
                    <div class="banner_text text-center">
                        <div class="banner_text_iner">
                            <h1>Give Today, <br/>
                                Make Tomorrow Better </h1>
                            <p>We Deliver your Donations to the Right Place</p>
                            <a href="#" class="btn_2">Start Donation</a>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>


    <div class="service_part">
        <div class="container">
            <div class="row justify-content-between align-items-center">
                <div class="col-lg-4 col-sm-10">
                    <div class="service_text">
                        <h2>Our Mission</h2>
                        <p>We aim to end food waste and hunger to make the "World Hunger Free".
                            We recover surplus food from weddings, parties and functions and
                            donate it to ready and hungry people. </p>
                        <a href="service.html" class="btn_3">learn more</a>
                    </div>
                </div>
                <div class="col-lg-7 col-xl-6">
                    <div class="service_part_iner">
                        <div class="row">
                            <div class="col-lg-6 col-sm-6">
                                <div class="single_service_text ">
                                    <i class="flaticon-money"></i>
                                    <h4>Be a Hunger Hero</h4>
                                    <p>Compassionate citizens like yourself, run most of our local chapters and 
                                        end up making a positive difference in the world everyday!
                                    </p>
                                    <a href="#">donate now</a>
                                </div>
                            </div>
                            <div class="col-lg-6 col-sm-6">
                                <div class="single_service_text">
                                    <i class="flaticon-money"></i>
                                    <h4>Donate at your doorstep</h4>
                                    <p>We will come to your doorstep to pick up the donations at the appointed time.</p>
                                    <a href="#">contact us</a>
                                </div>
                            </div>
                            <div class="col-lg-6 col-sm-6">
                                <div class="single_service_text">
                                    <i class="flaticon-money"></i>
                                    <h4>Become A Volunteer</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur elit seiusmod tempor incididunt</p>
                                    <a href="#">read more</a>
                                </div>
                            </div>
                            <div class="col-lg-6 col-sm-6">
                                <div class="single_service_text">
                                    <i class="flaticon-money"></i>
                                    <h4>Donation</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur elit seiusmod tempor incididunt</p>
                                    <a href="#">donate now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <section class="intro_video_bg">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-8">
                    <div class="intro_video_iner text-center">
                        <h2>Please raise your hand & Save world </h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Quis ipsum suspendisse ultrices gravida.</p>
                        <a href="#" class="btn_2">Become a Volunteer</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    


    <section class="client_part padding_bottom">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-6">
                    <div class="section_tittle text-center">
                        <h2>Our NGO Partners</h2>
                    </div>
                </div>
            </div>
            <div class="row align-items-center">
                
                    <div class="client_logo col-12">
                        <div class="row">
                        <div class="single_client_logo col-2">
                            <img src={Logo_1} alt=""/>
                        </div>
                        <div class="single_client_logo col-2">
                            <img src={Logo_1} alt=""/>
                        </div>
                        <div class="single_client_logo col-2">
                            <img src={Logo_1} alt=""/>
                        </div>
                        <div class="single_client_logo col-2">
                            <img src={Logo_1} alt=""/>
                        </div>
                        <div class="single_client_logo col-2">
                            <img src={Logo_1} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    

                
            </div>
            
        
           
    

        
    );
}

export default Home;