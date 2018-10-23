<template>
  <div>
    <nav-bar></nav-bar>
    <div class="bg-image">
      <div class="city">
        <p class="explore-city">Explore the ease of living in your city</p>
      </div>
      <div class="city-search">
        <span class="search-icon"><i class="fa fa-search"></i></span>
        <input id='filter' type="text" class="city-search-box" placeholder="Search for Metrics..." name="search">
      </div>
    </div>
    <br>
    <div class="container">
      <div class="row">
        <div class="col-md-2 col-md-offset-1">
          <p class="sidenav-head">AVAILABLE </p>
          <div class="sidenav">
            <a class="scroll" href="#">Civic Services</a>
            <a class="scroll" href="#environment">Environment</a>
          </div>
          <br>
          <div class="sidenav">
            <p class="sidenav-head">COMING SOON</p>
            <a class="scroll" href="#civic-service">Civic Services</a>
            <a class="scroll" href="#social-inclusion">Social inclusion</a>
            <a class="scroll" href="#disater-resilience">Disater resilience</a>
            <a class="scroll" href="#governance">Governance</a>
            <a class="scroll" href="#economy">Economy</a>
            <a class="scroll" href="#environment-2">Environment</a>
          </div>
        </div>
        <div class="col-md-9" id="type_search_list">
          <div id="civiv-service"  class="available-service">
            <h4>AVAILABLE</h4>
            <break></break>
            <h3 class="name">BASIC SERVICES </h3>
            <break></break>
            <div class="available-parent-flex">
              <div class="available-child name" data-name="public transport">
                <a href="/boundary?assets=transportMmtsStop">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/transport.svg" width="15">
                    </div>
                    <div class="child-parent-2">
                      <p class="mb2">Public Transport</p>
                      <p class="powered-by_text mb2">Bus Stop, MMTS stations, metro station</p>
                    </div>
                  </div>
                </a>
              </div>
              <div class="available-child name" data-name="street lights">
                <a href="/boundary?grievances=streetlightGrievance">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/transport.svg" width="15">
                    </div>
                    <div class="child-parent-2">
                      <p class="mb2">Street Lights</p>
                      <p class="powered-by_text mb2">Live streetlights Tracker, Streetlight-related grievances</p>
                    </div>
                  </div>
                </a>
              </div>
              <div class="available-child name" data-name="waste water">
                <a href="/boundary?grievances=drainageGrievance">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/transport.svg" width="15">
                    </div>
                    <div class="child-parent-2">
                      <p class="mb2">Waste Water</p>
                      <p class="powered-by_text mb2">Grievances related to drains and manholes</p>
                    </div>
                  </div>
                </a>
              </div>
              <div class="available-child name" data-name="solid waste">
                <a href="/boundary?grievances=garbageGrievance">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/transport.svg" width="15">
                    </div>
                    <div class="child-parent-2">
                      <p class="mb2">Solid waste</p>
                      <p class="powered-by_text mb2">Grievances related to solid waste and construction debris</p>
                    </div>
                  </div>
                </a>
              </div>
              <div class="available-child name" data-name="roads">
                <a href="/boundary?grievances=footpathGrievance">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/transport.svg" width="15">
                    </div>
                    <div class="child-parent-2">
                      <p class="mb2">Road</p>
                      <p class="powered-by_text mb2">Road Network, road grievances, live traffic data</p>
                    </div>
                  </div>
                </a>
              </div>
<!--             </div>
          </div> -->
              <break></break>

              <h3 class="name">SOCIAL SAFETY NETS</h3>

              <break></break>
              <div class="available-child name" data-name="education">
                <a href="/boundary?assets=educationSchoolLocation">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/transport.svg" width="15">
                    </div>
                    <div class="child-parent-2">
                      <p class="mb2">Education</p>
                      <p class="powered-by_text mb2">Govt and govt-aided schools</p>
                    </div>
                  </div>
                </a>
              </div>
              <div class="available-child name" data-name="health">
                <a href="/boundary?assets=govtHospitalLocation">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/transport.svg" width="15">
                    </div>
                    <div class="child-parent-2">
                      <p class="mb2">Health</p>
                      <p class="powered-by_text mb2">Govt Healthcare facilities, Arogyasri-empanelled private healthcare facilities</p>
                    </div>
                  </div>
                </a>
              </div>
                <div class="available-child name" data-name="public toilet">
                  <a href="/boundary?assets=publicToiletLocation">
                    <div class="available-child-parent">
                      <div class="child-parent-1">
                        <img src="assets/images/transport.svg" width="15">
                      </div>
                      <div class="child-parent-2">
                        <p class="mb2">Public toilet</p>
                        <p class="powered-by_text mb2">Public toilets and grievance related public toilets</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div class="available-child name" data-name="nutrition">
                  <a href="/boundary?assets=nutritionCanteen">
                    <div class="available-child-parent">
                      <div class="child-parent-1">
                        <img src="assets/images/transport.svg" width="15">
                      </div>
                      <div class="child-parent-2">
                        <p class="mb2">Nutrition</p>
                        <p class="powered-by_text mb2">5 meals canteens, Fair price shops</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div class="available-child name" data-name="shelter housing">
                  <a href="/boundary?assets=oldAgeHousing">
                    <div class="available-child-parent">
                      <div class="child-parent-1">
                        <img src="assets/images/transport.svg" width="15">
                      </div>
                      <div class="child-parent-2">
                        <p class="mb2">Shelter Housing</p>
                        <p class="powered-by_text mb2">2BHK housing scheme, GHMC old-age shelter, Aasra day-care center</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div class="available-child name" data-name="long term housing">
                  <a href="/boundary?assets=LongTermHousing">
                    <div class="available-child-parent">
                      <div class="child-parent-1">
                        <img src="assets/images/transport.svg" width="15">
                      </div>
                      <div class="child-parent-2">
                        <p class="mb2">Long Term Housing</p>
                        <p class="powered-by_text mb2">2BHK housing scheme, GHMC old-age shelter, Aasra day-care center</p>
                      </div>
                    </div>
                  </a>
                </div>
                <break></break>
                <h4 class="name">COMING SOON</h4>
                <break></break>
                <h3 class="name" id="social-inclusion" >Social inclusion</h3>
                <break></break>
                <div class="available-child name" data-name="slum upgradation">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/time-left.png" width="15">
                    </div>
                    <div class="child-parent-2 custom-opacity">
                      <p class="mb2">Slum upgradation</p>
                      <p class="location-text mb2">Location of all public transport</p>
                    </div>
                  </div>
                </div>
                <div class="available-child name" data-name="ratio(PDS)">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/time-left.png" width="15">
                    </div>
                    <div class="child-parent-2 custom-opacity">
                      <p class="mb2">Ratio(PDS)</p>
                      <p class="location-text mb2">Location of all public transport</p>
                    </div>
                  </div>
                </div>
                <break></break>
                <h3 class="name">Disaster resilience</h3>
                <break></break>
                <div class="available-child name" data-name="road access to emergency services">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/time-left.png" width="15">
                    </div>
                    <div class="child-parent-2 custom-opacity">
                      <p class="mb2">Road access to emergency services</p>
                      <p class="location-text mb2">Location of all public transport</p>
                    </div>
                  </div>
                </div>
                <div class="available-child name" data-name="flooding risk management">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/time-left.png" width="15">
                    </div>
                    <div class="child-parent-2 custom-opacity">
                      <p class="mb2">Flooding risk management</p>
                      <p class="powered-by_text mb2">Watershed analysis, potential analysis, vulnerable localities, rehab centers</p>
                    </div>
                  </div>
                </div>
                <div class="available-child name" data-name="ward wise equipment sufficiency">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/time-left.png" width="15">
                    </div>
                    <div class="child-parent-2 custom-opacity">
                      <p class="mb2">Ward-wise equipment sufficiency</p>
                      <p class="location-text mb2">Location of all public transport</p>
                    </div>
                  </div>
                </div>
                <div class="available-child name" data-name="crime prevention">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/time-left.png" width="15">
                    </div>
                    <div class="child-parent-2 custom-opacity">
                      <p class="mb2">Crime prevention</p>
                      <p class="location-text mb2">Location of all public transport</p>
                    </div>
                  </div>
                </div>
                <div class="available-child name" data-name="disease outbreak prevention">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/time-left.png" width="15">
                    </div>
                    <div class="child-parent-2 custom-opacity">
                      <p class="mb2">Disease outbreak prevention</p>
                      <p class="location-text mb2">Location of all public transport</p>
                    </div>
                  </div>
                </div>
                <div class="available-child name" data-name="fire risk management">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/time-left.png" width="15">
                    </div>
                    <div class="child-parent-2 custom-opacity">
                      <p class="mb2">Fire risk management</p>
                      <p class="powered-by_text mb2">Pubs and bars for inspection</p>
                    </div>
                  </div>
                </div>
                <div class="available-child name" data-name="structural collapse mgmt.">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/time-left.png" width="15">
                    </div>
                    <div class="child-parent-2 custom-opacity">
                      <p class="mb2">Structural collapse mgmt.</p>
                      <p class="location-text mb2">Location of all public transport</p>
                    </div>
                  </div>
                </div>
                <break></break>
                <h3 class="name" id="governance">Governance</h3>
                <break></break>
                <div class="available-child name" data-name="grievance redressal">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/time-left.png" width="15">
                    </div>
                    <div class="child-parent-2 custom-opacity">
                      <p class="mb2">Grievance redressal</p>
                      <p class="powered-by_text mb2">Grievance redressal efficiency, delays, and citizen satisfaction</p>
                    </div>
                  </div>
                </div>
                <div class="available-child name" data-name="revenue and budget">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/time-left.png" width="15">
                    </div>
                    <div class="child-parent-2 custom-opacity">
                      <p class="mb2">Revenue and budget</p>
                      <p class="location-text mb2">Location of all public transport</p>
                    </div>
                  </div>
                </div>
                <div class="available-child name" data-name="zoning law adherence">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/time-left.png" width="15">
                    </div>
                    <div class="child-parent-2 custom-opacity">
                      <p class="mb2">Zoning law adherence</p>
                      <p class="location-text mb2">Location of all public transport</p>
                    </div>
                  </div>
                </div>
                <div class="available-child name" data-name="building code adherence">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/time-left.png" width="15">
                    </div>
                    <div class="child-parent-2 custom-opacity">
                      <p class="mb2">Building code adherence</p>
                      <p class="location-text mb2">Location of all public transport</p>
                    </div>
                  </div>
                </div>
                <div class="available-child name" data-name="voter turnout">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/time-left.png" width="15">
                    </div>
                    <div class="child-parent-2 custom-opacity">
                      <p class="mb2">Voter turnout</p>
                      <p class="powered-by_text mb2">Ward committee members, and women repesentation in ward committees</p>
                    </div>
                  </div>
                </div>
                <div class="available-child name" data-name="ward committee">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/time-left.png" width="15">
                    </div>
                    <div class="child-parent-2 custom-opacity">
                      <p class="mb2">Ward committee</p>
                      <p class="location-text mb2">Location of all public transport</p>
                    </div>
                  </div>
                </div>
                <div class="available-child name" data-name="area Sabha">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/time-left.png" width="15">
                    </div>
                    <div class="child-parent-2 custom-opacity">
                      <p class="mb2">Area Sabha</p>
                      <p class="location-text mb2">Location of all public transport</p>
                    </div>
                  </div>
                </div>
                <break></break>
                <h3 class="name" id="economy">Economy</h3>
                <break></break>
                <div class="available-child name" data-name="property Valuations">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/time-left.png" width="15">
                    </div>
                    <div class="child-parent-2 custom-opacity">
                      <p class="mb2">Property Valuations</p>
                      <p class="location-text mb2">Location of all public transport</p>
                    </div>
                  </div>
                </div>
                <div class="available-child name" data-name="banking density">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/time-left.png" width="15">
                    </div>
                    <div class="child-parent-2 custom-opacity">
                      <p class="mb2">Banking density</p>
                      <p class="powered-by_text mb2">Commercial zones( crowdsourced )</p>
                    </div>
                  </div>
                </div>
                <div class="available-child name" data-name="skilling services">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/time-left.png" width="15">
                    </div>
                    <div class="child-parent-2 custom-opacity">
                      <p class="mb2">Skilling services</p>
                      <p class="location-text mb2">Location of all public transport</p>
                    </div>
                  </div>
                </div>
                <div class="available-child name" data-name="mixed land use">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/time-left.png" width="15">
                    </div>
                    <div class="child-parent-2 custom-opacity">
                      <p class="mb2">Mixed land use</p>
                      <p class="location-text mb2">Location of all public transport</p>
                    </div>
                  </div>
                </div>
                <div class="available-child name" data-name="business density">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/time-left.png" width="15">
                    </div>
                    <div class="child-parent-2 custom-opacity">
                      <p class="mb2">Business density</p>
                      <p class="location-text mb2">Location of all public transport</p>
                    </div>
                  </div>
                </div>
                <div class="available-child name" data-name="pvt. infra growth">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/time-left.png" width="15">
                    </div>
                    <div class="child-parent-2 custom-opacity">
                      <p class="mb2">Pvt. infra growth</p>
                      <p class="location-text mb2">Location of all public transport</p>
                    </div>
                  </div>
                </div>
                <div class="available-child name" data-name="women in workforce">
                  <div class="available-child-parent">
                    <div class="child-parent-1">
                      <img src="assets/images/time-left.png" width="15">
                    </div>
                    <div class="child-parent-2 custom-opacity">
                      <p class="mb2">Women in workforce</p>
                      <p class="location-text mb2">Location of all public transport</p>
                    </div>
                  </div>
                </div>
                <break></break>
                <h3 class="name" id="environment-2">Environment</h3>
                <break></break>
                <div class="available-parent-flex">
                  <div class="available-child name" data-name="parks & Open spaces">
                    <div class="available-child-parent">
                      <div class="child-parent-1">
                        <img src="assets/images/time-left.png" width="20">
                      </div>
                      <div class="child-parent-2 custom-opacity">
                        <p class="mb2">Parks & Open spaces</p>
                        <p class="powered-by_text mb2">GHMC and HMDA parks, crowdsourced parks</p>
                      </div>
                    </div>
                  </div>
                  <div class="available-child name" data-name="green cover">
                    <div class="available-child-parent">
                      <div class="child-parent-1">
                        <img src="assets/images/time-left.png" width="20">
                      </div>
                      <div class="child-parent-2 custom-opacity">
                        <p class="mb2">Green cover</p>
                        <p class="powered-by_text mb2">Natural Vegetation Density index</p>
                      </div>
                    </div>
                  </div>
                  <div class="available-child name" data-name="air pollution">
                    <div class="available-child-parent">
                      <div class="child-parent-1">
                        <img src="assets/images/time-left.png" width="20">
                      </div>
                      <div class="child-parent-2 custom-opacity">
                        <p class="mb2">Air pollution</p>
                        <p class="powered-by_text mb2">Real-time air quality data from 6 locations</p>
                      </div>
                    </div>
                  </div>
                  <div class="available-child name" data-name="noise pollution">
                    <div class="available-child-parent">
                      <div class="child-parent-1">
                        <img src="assets/images/time-left.png" width="15">
                      </div>
                      <div class="child-parent-2 custom-opacity">
                        <p class="mb2">Noise pollution</p>
                        <p class="powered-by_text mb2">Noise pollution for 10 locations</p>
                      </div>
                    </div>
                  </div>
                  <div class="available-child name" data-name="lake pond pollution">
                    <div class="available-child-parent">
                      <div class="child-parent-1">
                        <img src="assets/images/time-left.png" width="15">
                      </div>
                      <div class="child-parent-2 custom-opacity">
                        <p class="mb2">Lake/Pond pollution</p>
                        <p class="powered-by_text mb2">Lake pollution data for specific lakes</p>
                      </div>
                    </div>
                  </div>
                  <div class="available-child name" data-name="industrial pollution">
                    <div class="available-child-parent">
                      <div class="child-parent-1">
                        <img src="assets/images/time-left.png" width="15">
                      </div>
                      <div class="child-parent-2 custom-opacity">
                        <p class="mb2">Industrial pollution</p>
                        <p class="location-text mb2">Location of all public transport</p>
                      </div>
                    </div>
                  </div>
                  <div class="available-child name" data-name="landfill pollution">
                    <div class="available-child-parent">
                      <div class="child-parent-1">
                        <img src="assets/images/time-left.png" width="15">
                      </div>
                      <div class="child-parent-2 custom-opacity">
                        <p class="mb2">Landfill pollution</p>
                        <p class="location-text mb2">Location of all public transport</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '../layouts/NavBar.vue'
  export default {
    components: {
      'nav-bar': NavBar
    },
    methods: {
      logout(){
        localStorage.setItem("accessToken", '')
        this.$router.push('/')
      }
    }
  }
</script>
<style lang="scss">
</style>
