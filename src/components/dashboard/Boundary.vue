<template>
  <div>
    <nav-bar></nav-bar>
  	<div>
  		<div id="lakeer-map" style="width:100%;height: 100vh;">

  		</div>
  		<div class="fixed-sidenav">
        <div class="location-search">
    			<p class="fa fa-map-marker location-lable"> Location</p>
    			<input type="text" id="autocomplete_search" class="location-input" placeholder="Search.." name="search">
        </div>
        <div class="department-boundary">
    			<div>
    				<p class="department-header">Department boundary</p>
    			</div>
          <div class="boundaries">
            <ul>
              <li class="boundary"><span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#ghmc-boundary"> GHMC</span>
    						<ul id="ghmc-boundary" class="collapse dropdown-list">
    							<li class="zone">
                    <input class="check" type="checkbox" name="department boundary" ref="ghmcZone" data-ref="ghmcZone" value="Zone" @click="loadBoundary('GHMC', 'Zone', $event)">
            				<span class="department-list-filter"> Zone</span>
                  </li>
                  <li>
                    <input class="check" type="checkbox" name="department boundary" ref="ghmcCircle" data-ref="ghmcCircle" value="Circle" @click="loadBoundary('GHMC', 'Circle', $event)">
            				<span class="department-list-filter"> Circle</span>
                  </li>
                  <li>
                    <input class="check" type="checkbox" name="department boundary" ref="ghmcWard" data-ref="ghmcWard" value="Ward" @click="loadBoundary('GHMC', 'Ward', $event)">
            				<span class="department-list-filter"> Ward</span>
                  </li>
                </ul>
              </li>
              <li class="boundary"><span class="glyphicon glyphicon-plus toggle_icon"data-toggle="collapse" data-target="#hmwssb-boundary"> HMWSSB</span>
    						<ul id="hmwssb-boundary" class="collapse dropdown-list">
    							<li>
                    <input class="check" type="checkbox" name="department boundary" ref="hmwssbCircle" data-ref="hmwssbCircle" value="Circle" @click="loadBoundary('HMWSSB', 'Circle', $event)">
            				<span class="department-list-filter"> Circle</span>
                  </li>
                  <li>
                    <input class="check" type="checkbox" name="department boundary" ref="hmwssbDivision" data-ref="hmwssbDivision" value="Division" @click="loadBoundary('HMWSSB', 'Division', $event)">
            				<span class="department-list-filter"> Division</span>
                  </li>
                  <li>
                    <input class="check" type="checkbox" name="department boundary" ref="hmwssbSubDivision" data-ref="hmwssbSubDivision" value="Sub-Division" @click="loadBoundary('HMWSSB', 'Sub-Division', $event)">
            				<span class="department-list-filter"> Sub Division</span>
                  </li>
                  <li>
                    <input class="check" type="checkbox" name="department boundary" ref="hmwssbBoundary" data-ref="hmwssbBoundary" value="Boundary" @click="loadBoundary('HMWSSB', 'Boundary', $event)">
            				<span class="department-list-filter"> Boundary</span>
                  </li>
                </ul>
              </li>
            </ul>
            <div>
      				<p class="department-header">General Data layer</p>
      			</div>
            <ul>
							<li>
                <input class="check" type="checkbox" name="department boundary" ref="domesticRailways" data-ref="domesticRailways" value="domestic_railways" @click="loadResource('railway', 'domestic_railways', $event)">
        				<span class="department-list-filter"> Domestic Railways</span>
              </li>
              <li>
                <input class="check" type="checkbox" name="department boundary" ref="musiRiver" data-ref="musiRiver" value="musi_river" @click="loadResource('river', 'musi_river', $event)">
        				<span class="department-list-filter"> Musi river</span>
              </li>
              <li>
                <input class="check" type="checkbox" name="department boundary" ref="domesticWaterways" data-ref="domesticWaterways" value="domestic_waterways" @click="loadResource('waterway', 'domestic_waterways', $event)">
        				<span class="department-list-filter"> Domestic Waterway</span>
              </li>
            </ul>
          </div>
    			<div class="department-metrics">
            <div class="row">
              <div class="col-md-6">
                <p class="department-header"> Metrics</p>
              </div>
              <div class="col-md-6">
                <div class="square-box-div pull-right">
                    <p v-for="(selected_checkbox, index) in selected_checkboxes" :class="[selected_checkbox]" v-model="selected_checkboxes" class="square-box"></p>
                </div>
              </div>
            </div>
    				<div class="department-list-filter">
              <ul>
                <li class="sub-category"><span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#metric-2"> Basic services</span>
      						<ul id="metric-2" class="collapse dropdown-list">
      							<li>
                      <!-- <input class="check" type="checkbox" name="air pollution" value=""> -->
                      <span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#metric-3"> Public transport</span>
                    </li>
      							<ul id="metric-3" class="collapse dropdown-child-list">
      								<li class="bus-stops">
                        <input class="check" type="checkbox" name="bus-stops" ref="transportBusStop" data-ref="transportBusStop" value="" id="checkbox1" @click="loadMarker('basic_service', 'public_transport', 'hyderabad_bus_stops', $event)">
                        <label for="checkbox1">  Bus stops</label>
                      </li>
                      <li><input class="check" type="checkbox" name="bus-stops" value="" @click="loadHeatMap('bus_stop', 'service_asset')"><label> Heatmap</label></li>
                      <li v-if="selected_checkboxes.includes('hyderabad_bus_stops')">
                        <span>Buffer radius(km) </span>
                        <input class="check wd30" type="text" name="buffer_radius" v-model="filters.bufferRadius.hyderabad_bus_stops" v-on:keyup="loadBufferRadius('hyderabad_bus_stops')">
                      </li>
                      <li class="mmts-stops"><input class="check" type="checkbox" name="mmts" id="checkbox3" ref="transportMmtsStop" data-ref="transportMmtsStop"  value="" @click="loadMarker('basic_service', 'public_transport', 'hyderabad_mmts_stops', $event)"><label for="checkbox3"> MMTS</label></li>
                      <li><input class="check" type="checkbox" name="bus-stops" value="" @click="loadHeatMap('mmts_stop', 'service_asset')"><label> Heatmap</label></li>
                      <li v-if="selected_checkboxes.includes('hyderabad_mmts_stops')">

                        <div>
                          <span>Buffer radius(km) </span>
                          <input class="check wd30" type="text" name="buffer_radius" v-model="filters.bufferRadius.hyderabad_mmts_stops" v-on:keyup="loadBufferRadius('hyderabad_mmts_stops')">
                        </div>
                      </li>
                      <li class="metro"><input class="check" type="checkbox" name="metro-stations" id="checkbox2" ref="transportMetroStation" data-ref="transportMetroStation" value="" @click="loadMarker('basic_service', 'public_transport', 'hyderabad_metro_stations', $event)"><label for="checkbox2"> Metro stations</label></li>
                      <li><input class="check" type="checkbox" name="bus-stops" value="" @click="loadHeatMap('metro_station', 'service_asset')"><label> Heatmap</label></li>
                      <li v-if="selected_checkboxes.includes('hyderabad_metro_stations')">
                        <span>Buffer radius(km) </span>
                        <input class="check wd30" type="text" name="buffer_radius" v-model="filters.bufferRadius.hyderabad_metro_stations" v-on:keyup="loadBufferRadius('hyderabad_metro_stations')">
                      </li>

      							</ul>
      							<li>
                      <span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#metric-4"> Street lights</span>
                    </li>
      							<ul id="metric-4" class="collapse dropdown-child-list">
      								<li class="grievance"><input class="check" type="checkbox" name="bus-stops" id="checkbox4" ref="streetlightGrievance" data-ref="streetlightGrievance" value="" @click="loadGrievance('streetlight', $event)"><label for="checkbox4"> Grievances</label></li>
                      <li><input class="check" type="checkbox" name="bus-stops" value="" @click="loadHeatMap('streetlight', 'grievance')"><label> Heatmap</label></li>
      							</ul>
                    <li>
                      <span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#metric-5"> Solid waste</span>
                    </li>
                    <ul id="metric-5" class="collapse dropdown-child-list">
                      <li>
                        <span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#garbage"> Garbage Grievances</span>
                      </li>
                      <ul id="garbage" class="collapse dropdown-child-list">
                        <li class="grievance"><input class="check" type="checkbox" name="bus-stops" ref="garbageGrievance" data-ref="garbageGrievance" id="checkbox9" value="" @click="loadGrievance('garbage', $event)"><label for="checkbox9"> Grievances</label></li>
                        <li><input class="check" type="checkbox" name="bus-stops" id="checkbox10" value="" @click="loadHeatMap('garbage', 'grievance')"><label for="checkbox10"> Heatmap</label></li>
                      </ul>
                      <li>
                        <span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#construction_debris"> Construction Grievance</span>
                      </li>
                      <ul id="construction_debris" class="collapse dropdown-child-list">
                        <li class="grievance"><input class="check" type="checkbox" name="bus-stops" id="checkbox11" ref="constructionDebrisGrievance" data-ref="constructionDebrisGrievance" value="" @click="loadGrievance('construction_debris', $event)"><label for="checkbox11"> Grievances</label></li>
                        <li><input class="check" type="checkbox" name="bus-stops" id="checkbox12" value="" @click="loadHeatMap('construction_debris', 'grievance')"><label for="checkbox12"> Heatmap</label></li>
                      </ul>
                    </ul>
                    <li>
                      <span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#metric-6"> Waste Water</span>
                    </li>
      							<ul id="metric-6" class="collapse dropdown-child-list">
                      <li>
                        <span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#drainage">Citizen Grievance-Drainage</span>
                      </li>
                      <ul id="drainage" class="collapse dropdown-child-list">
      								  <li class="grievance"><input class="check" type="checkbox" name="bus-stops" id="checkbox5" ref="drainageGrievance" data-ref="drainageGrievance"  value="" @click="loadGrievance('drainage', $event)"><label id="checkbox5">  Grievances</label></li>
                        <li><input class="check" type="checkbox" id="checkbox6" name="bus-stops" value="" @click="loadHeatMap('drainage', 'grievance')"><label for="checkbox6"> Heatmap</label></li>
                      </ul>
                      <li>
                        <span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#manhole">Citizen Grievance-Manhole</span>
                      </li>
                      <ul id="manhole" class="collapse dropdown-child-list">
                        <li class="grievance"><input class="check" type="checkbox" id="checkbox7" name="bus-stops" ref="manholeGrievance" data-ref="manholeGrievance" value="" @click="loadGrievance('manhole', $event)"><label for="checkbox7"> Grievances</label></li>
                        <li><input class="check" type="checkbox" id="checkbox8" name="bus-stops" value="" @click="loadHeatMap('manhole', 'grievance')"><label for="checkbox8"> Heatmap</label></li>
                      </ul>
      							</ul>

                    <li>
                      <span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#metric-7"> Roads</span>
                    </li>
      							<ul id="metric-7" class="collapse dropdown-child-list">
                      <li>
                        <span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#pothole"> Potholes</span>
                      </li>
                      <ul id="pothole" class="collapse dropdown-child-list">
                        <li class="grievance"><input class="check" type="checkbox" name="bus-stops" id="checkbox15" ref="potholeGrievance" data-ref="potholeGrievance" value="" @click="loadGrievance('pothole', $event)"><label for="checkbox15"> Grievances</label></li>
                        <li><input class="check" type="checkbox" name="bus-stops" id="checkbox16" value="" @click="loadHeatMap('pothole', 'grievance')"><label for="checkbox16"> Heatmap</label></li>
                      </ul>
                      <li>
                        <span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#footpath"> Footpath</span>
                      </li>
                      <ul id="footpath" class="collapse dropdown-child-list">
        								<li class="grievance"><input class="check" type="checkbox" name="bus-stops" id="checkbox13" ref="footpathGrievance" data-ref="footpathGrievance" value="" @click="loadGrievance('footpath', $event)"><label for="checkbox13"> Grievances</label></li>
                        <li><input class="check" type="checkbox" name="bus-stops" id="checkbox14" value="" @click="loadHeatMap('footpath', 'grievance')"><label id="checkbox14"> Heatmap</label></li>
                      </ul>
                      <li>
                        <span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#junction"> Junction</span>
                      </li>
                      <ul id="junction" class="collapse dropdown-child-list">
                        <li class="junction"><input class="check" type="checkbox" name="junction" id="junction" ref="junctionLocation" data-ref="junctionLocation" value="" @click="loadMarker('basic_service', 'roads', 'junction', $event)"><label for="checkbox13"> Locations</label></li>
                        <li><input class="check" type="checkbox" name="bus-stops" id="checkbox14" value="" @click="loadHeatMap('footpath', 'grievance')"><label id="checkbox14"> Heatmap</label></li>
                      </ul>

      							</ul>
      						</ul>
      					</li>
              </ul>
              <ul>
                <li class="sub-category cursor_pointer"><span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#urban-poverty"> Social Safety Nets</span>
      						<ul id="urban-poverty" class="collapse dropdown-list">
      							<li>
                      <span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#education"> Affordable Education</span>
                    </li>
      							<ul id="education" class="collapse dropdown-child-list">
      								<li class="education"><input class="check" type="checkbox" name="bus-stops" id="checkbox17" ref="educationSchoolLocation" data-ref="educationSchoolLocation" value="" @click="loadMarker('urban_poverty', 'education', 'schools', $event)"><label for="checkbox17"> Schools</label></li>
                      <li><input class="check" type="checkbox" name="bus-stops" value="" @click="loadHeatMap('school', 'service_asset')"><label> Heatmap</label></li>
                      <li v-if="selected_checkboxes.includes('schools')">

                        <div>
                          <span>Buffer radius(km) </span>
                          <input class="check wd30" type="text" name="buffer_radius" v-model="filters.bufferRadius.schools" v-on:keyup="loadBufferRadius('schools')">
                        </div>
                      </li>
      							</ul>
                    <li>
                      <span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#health"> Affordable Health</span>
                    </li>
      							<ul id="health" class="collapse dropdown-child-list">
      								<li class="hospital"><input class="check" type="checkbox" name="bus-stops" id="checkbox18" ref="govtHospitalLocation" data-ref="govtHospitalLocation" value="" @click="loadMarker('urban_poverty', 'health', 'govt_hospitals', $event)"><label for="checkbox18"> Govt. Hospital</label></li>
                      <li><input class="check" type="checkbox" name="bus-stops" value="" @click="loadHeatMap('govt_hospital', 'service_asset')"><label> Heatmap</label></li>
                      <li v-if="selected_checkboxes.includes('govt_hospitals')">
                        <div>
                          <span>Buffer radius(km) </span>
                          <input class="check wd30" type="text" name="buffer_radius" v-model="filters.bufferRadius.govt_hospitals" v-on:keyup="loadBufferRadius('govt_hospitals')">
                        </div>
                      </li>
                      <li class="afford_health_care"><input class="check" type="checkbox" name="bus-stops" id="checkbox19" ref="affordableHealthCareLocation" data-ref="affordableHealthCareLocation" value="" @click="loadMarker('urban_poverty', 'health', 'all_affordable_healthcare_facilities', $event)"><label for="checkbox19"> Affordable Health care</label></li>
                      <li><input class="check" type="checkbox" name="bus-stops" value="" @click="loadHeatMap('affordable_healthcare_centre', 'service_asset')"><label> Heatmap</label></li>
                      <li v-if="selected_checkboxes.includes('all_affordable_healthcare_facilities')">
                        <div>
                          <span>Buffer radius(km) </span>
                          <input class="check wd30" type="text" name="buffer_radius" v-model="filters.bufferRadius.all_affordable_healthcare_facilities" v-on:keyup="loadBufferRadius('all_affordable_healthcare_facilities')">
                        </div>
                      </li>
                      <li class="basti_dawakhana_check"><input class="check" type="checkbox" name="bus-stops" id="checkbox20" ref="bastiDawakhanaLocation" data-ref="bastiDawakhanaLocation" value="" @click="loadMarker('urban_poverty', 'health', 'basti_dawakhana', $event)"><label for="checkbox20"> Basti dwakhana</label></li>
                      <li><input class="check" type="checkbox" name="bus-stops" value="" @click="loadHeatMap('basti_dawakhana', 'service_asset')"><label> Heatmap</label></li>
                      <li v-if="selected_checkboxes.includes('basti_dawakhana')">
                        <div>
                          <span>Buffer radius(km) </span>
                          <input class="check wd30" type="text" name="buffer_radius" v-model="filters.bufferRadius.basti_dawakhana" v-on:keyup="loadBufferRadius('basti_dawakhana')">
                        </div>
                      </li>
                      <li class="govt_health_clinics"><input class="check" type="checkbox" name="bus-stops" id="checkbox21" ref="govtHealthClinicLocation" data-ref="govtHealthClinicLocation" value="" @click="loadMarker('urban_poverty', 'health', 'govt_primary_health_clinics', $event)"><label for="checkbox21"> Govt. Primary clinic</label></li>
                      <li><input class="check" type="checkbox" name="bus-stops" value="" @click="loadHeatMap('govt_phc', 'service_asset')"><label> Heatmap</label></li>
                      <li v-if="selected_checkboxes.includes('govt_primary_health_clinics')">

                        <div>
                          <span>Buffer radius(km) </span>
                          <input class="check wd30" type="text" name="buffer_radius" v-model="filters.bufferRadius.govt_primary_health_clinics" v-on:keyup="loadBufferRadius('govt_primary_health_clinics')">
                        </div>
                      </li>
                      <li class="pvt_arogyasri_empanelled"><input class="check" type="checkbox" name="bus-stops" id="checkbox22" ref="arogyasriEmpanelledLocation" data-ref="arogyasriEmpanelledLocation" value="" @click="loadMarker('urban_poverty', 'health', 'private_arogyasri_empanelled', $event)"><label for="checkbox22"> Private arogyasri empanelled</label></li>
                      <li><input class="check" type="checkbox" name="bus-stops" value="" @click="loadHeatMap('private_arogyasri', 'service_asset')"><label> Heatmap</label></li>
                      <li v-if="selected_checkboxes.includes('private_arogyasri_empanelled')">

                        <div>
                          <span>Buffer radius(km) </span>
                          <input class="check wd30" type="text" name="buffer_radius" v-model="filters.bufferRadius.private_arogyasri_empanelled" v-on:keyup="loadBufferRadius('private_arogyasri_empanelled')">
                        </div>
                      </li>
      							</ul>
                    <li>
                      <span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#public_toilet"> Public Toilet</span>
                    </li>
      							<ul id="public_toilet" class="collapse dropdown-child-list">
      								<li class="toilet_location"><input class="check" type="checkbox" name="bus-stops" id="checkbox23" ref="publicToiletLocation" data-ref="publicToiletLocation" value="" @click="loadMarker('urban_poverty', 'sanitation', 'public_toilet_locations', $event)"><label for="checkbox23"> Toilet location</label></li>
                      <li><input class="check" type="checkbox" name="bus-stops" value="" @click="loadHeatMap('public_toilet', 'service_asset')"><label> Heatmap</label></li>
                      <li v-if="selected_checkboxes.includes('public_toilet_locations')">
                        <div>
                          <span>Buffer radius(km) </span>
                          <input class="check wd30" type="text" name="buffer_radius" v-model="filters.bufferRadius.public_toilet_locations" v-on:keyup="loadBufferRadius('public_toilet_locations')">
                        </div>
                      </li>
                      <li class="grievance"><input class="check" type="checkbox" name="bus-stops" id="checkbox24" ref="publicToiletGrievance" data-ref="publicToiletGrievance" value="" @click="loadGrievance('public_toilet', $event)"><label for="checkbox24"> Toilet Grievances</label></li>
                      <li><input class="check" type="checkbox" name="bus-stops" value="" @click="loadHeatMap('public_toilet', 'grievance')"><label> Heatmap</label></li>
      							</ul>
                    <li>
                      <span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#shelter_housing"> Affordable shelter housing</span>
                    </li>
                    <ul id="shelter_housing" class="collapse dropdown-child-list">
                      <li class="shelter_housing">
                        <input class="check" type="checkbox" name="old-age-housing" id="old_age_shelters" ref="oldAgeHousing" data-ref="oldAgeHousing" value="" @click="loadMarker('urban_poverty', 'nursing_home', 'old_age_shelters', $event)">
                        <label for="old_age_shelters"> Old Age Shelters</label>
                      </li>
                      <li><input class="check" type="checkbox" name="bus-stops" value="" @click="loadHeatMap('old_age_shelters', 'service_asset')"><label> Heatmap</label></li>
                      <li v-if="selected_checkboxes.includes('old_age_shelters')">
                        <span>Buffer radius </span>
                        <input class="check wd30" type="text" name="buffer_radius" v-model="filters.bufferRadius.old_age_shelters" v-on:keyup="loadBufferRadius('old_age_shelters')">
                      </li>
                    </ul>
                    <li>
                      <span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#housing">Affordable long term housing</span>
                    </li>
                    <ul id="housing" class="collapse dropdown-child-list">
                      <li class="housing">
                        <input class="check" type="checkbox" name="long-term-housing" id="long_term_housing" ref="LongTermHousing" data-ref="LongTermHousing" value="" @click="loadMarker('urban_poverty', 'housing', 'long_term_housing', $event)">
                        <label for="long_term_housing"> 2BHK Housing</label>
                      </li>
                      <li><input class="check" type="checkbox" name="bus-stops" value="" @click="loadHeatMap('long_term_housing', 'service_asset')"><label> Heatmap</label></li>
                      <li v-if="selected_checkboxes.includes('long_term_housing')">
                        <span>Buffer radius </span>
                        <input class="check wd30" type="text" name="buffer_radius" v-model="filters.bufferRadius.long_term_housing" v-on:keyup="loadBufferRadius('long_term_housing')">
                      </li>
                    </ul>
                    <li>
                      <span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#nutrition"> Affordable nutrition</span>
                    </li>
                    <ul id="nutrition" class="collapse dropdown-child-list">
                      <li class="nutrition">
                        <input class="check" type="checkbox" name="rs_5_meal_canteens" ref="nutritionCanteen" data-ref="nutritionCanteen" value="" @click="loadMarker('urban_poverty', 'nutrition', 'rs_5_meal_canteens', $event)"> Canteen
                      </li>
                      <li v-if="selected_checkboxes.includes('rs_5_meal_canteens')">
                        <span>Buffer radius </span>
                        <input class="check wd30" type="text" name="buffer_radius" v-model="filters.bufferRadius.rs_5_meal_canteens" v-on:keyup="loadBufferRadius('rs_5_meal_canteens')">
                      </li>
                    </ul>
                    <!-- <li>
                      <span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#pothole"> Potholes</span>
                    </li>
                    <ul id="pothole" class="collapse dropdown-child-list">
                      <li><input class="check" type="checkbox" name="bus-stops" value="" @click="loadGrievance('manhole', $event)"> Grievances</li>
                      <li><input class="check" type="checkbox" name="bus-stops" value="" @click="loadHeatMap('manhole')"> Heatmap</li>
                    </ul> -->
    							</ul>
    						</li>
    					</ul>
              <ul>
                <li class="sub-category cursor_pointer"><span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#disaster-resilience"> Disaster Resilience</span>
      						<ul id="disaster-resilience" class="collapse dropdown-list">
      							<li>
                      <span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#police-station"> Police Station</span>
                    </li>
      							<ul id="police-station" class="collapse dropdown-child-list">
      								<li class="police-station">
                        <input class="check" type="checkbox" name="police-station" id="checkbox17" ref="policeStationLocation" data-ref="policeStationLocation" value="" @click="loadMarker('disaster_resiliences', 'disaster_response_services', 'police_station', $event)">
                        <label for="checkbox17"> Station Location</label>
                      </li>
                      <li>
                        <input class="check" type="checkbox" name="bus-stops" value="" @click="loadHeatMap('police_station', 'service_asset')">
                        <label> Heatmap</label>
                      </li>
                      <li v-if="selected_checkboxes.includes('police_station')">
                        <div>
                          <span>Buffer radius(km) </span>
                          <input class="check wd30" type="text" name="buffer_radius" v-model="filters.bufferRadius.police_station" v-on:keyup="loadBufferRadius('police_station')">
                        </div>
                      </li>
      							</ul>
                    <li>
                      <span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#fire-station"> Fire Station</span>
                    </li>
      							<ul id="fire-station" class="collapse dropdown-child-list">
      								<li class="fire-station">
                        <input class="check" type="checkbox" name="fire-station" id="fire_station_checkbox" ref="fireStationLocation" data-ref="fireStationLocation" value="" @click="loadMarker('disaster_resiliences', 'disaster_response_services', 'fire_station', $event)">
                        <label for="fire_station_checkbox"> Station Location</label>
                      </li>
                      <li>
                        <input class="check" type="checkbox" name="bus-stops" value="" @click="loadHeatMap('fire_station', 'service_asset')">
                        <label> Heatmap</label>
                      </li>
                      <li v-if="selected_checkboxes.includes('fire_station')">
                        <div>
                          <span>Buffer radius(km) </span>
                          <input class="check wd30" type="text" name="buffer_radius" v-model="filters.bufferRadius.fire_station" v-on:keyup="loadBufferRadius('fire_station')">
                        </div>
                      </li>
      							</ul>
                    <li>
                      <span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#govt-hospital-drs"> Govt. Hospital</span>
                    </li>
                    <ul id="govt-hospital-drs" class="collapse dropdown-child-list">
      								<li class="govt-hospital-drs">
                        <input class="check" type="checkbox" name="govt-hospital-drs" id="govt_hospital_drs_checkbox" ref="govtHospitalDrsLocation" data-ref="govtHospitalDrsLocation" value="" @click="loadMarker('disaster_resiliences', 'disaster_response_services', 'govt_hospitals', $event)">
                        <label for="govt_hospital_drs_checkbox"> Station Location</label>
                      </li>
                      <li>
                        <input class="check" type="checkbox" name="bus-stops" value="" @click="loadHeatMap('govt_hospital_drs', 'service_asset')">
                        <label> Heatmap</label>
                      </li>
                      <li v-if="selected_checkboxes.includes('govt_hospital_drs')">
                        <div>
                          <span>Buffer radius(km) </span>
                          <input class="check wd30" type="text" name="buffer_radius" v-model="filters.bufferRadius.govt_hospital_drs" v-on:keyup="loadBufferRadius('govt_hospital_drs')">
                        </div>
                      </li>
      							</ul>
                    <li>
                      <span class="glyphicon glyphicon-plus toggle_icon" data-toggle="collapse" data-target="#arogyasri-empanelled-drs"> Arogyasri empanelled</span>
                    </li>
                    <ul id="arogyasri-empanelled-drs" class="collapse dropdown-child-list">
      								<li class="arogyasri-empanelled-drs">
                        <input class="check" type="checkbox" name="arogyasri-empanelled-drs" id="arogyasri_empanelled_drs_checkbox" ref="privateArogyasriEmpanelledLocation" data-ref="privateArogyasriEmpanelledLocation" value="" @click="loadMarker('disaster_resiliences', 'disaster_response_services', 'private_arogyasri_empanelled', $event)">
                        <label for="arogyasri_empanelled_drs_checkbox"> Station Location</label>
                      </li>
                      <li>
                        <input class="check" type="checkbox" name="bus-stops" value="" @click="loadHeatMap('arogyasri_empanelled_drs', 'service_asset')">
                        <label> Heatmap</label>
                      </li>
                      <li v-if="selected_checkboxes.includes('arogyasri_empanelled_drs')">
                        <div>
                          <span>Buffer radius(km) </span>
                          <input class="check wd30" type="text" name="buffer_radius" v-model="filters.bufferRadius.arogyasri_empanelled_drs" v-on:keyup="loadBufferRadius('arogyasri_empanelled_drs')">
                        </div>
                      </li>
      							</ul>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="traffic-layer-block">
          <input class="check" type="checkbox" name="traffic-layer" id="traffic-layer" ref="trafficLayer" value="" @click="loadTrafficLayer($event)">
          <label for="traffic-layer"> Enable Traffic Layer</label>
  			</div>
        <div class="traffic-layer-block">
          <a href="#" @click="downloadPdf($event)"><label for="traffic-layer"> Export PDF</label></a>
  			</div>
  			<div class="underserved-areas-div">
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#undeservedModal">
            Show underserved areas
          </button>
  			</div>
        <div id='cntnr'>
          <ul id='items'>
            <li @click="create_folder">Create Folder</li>
            <li>Add a layer</li>
          </ul>
          <hr />
          <ul id="items">
            <li>Lock selection</li>
          </ul>
          <hr />
          <ul id='items'>
            <li>Send to Back</li>
            <li>Bring to Front</li>
          </ul>
        </div>
      </div>
  	</div>
    <div class="loader-section" v-if="ajaxLoader">
      <span class="glyphicon glyphicon-refresh"></span>
    </div>
    <div class="temp-div" v-if="colorCodeRange.length > 0">
      <div class="parent-temp-flex">
        <template v-for="(range, i) in colorCodeRange" :class="{i}">
          <div class="child-1">
            <p class="color-container" :style="{backgroundColor: range.color_code}"> </p>
            <p  class="text-center temp-degree" >
              {{ range.min }} - {{ range.max }}
            </p>
          </div>
        </template>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="undeservedModal" tabindex="-1" role="dialog" aria-labelledby="undeservedLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <span class="modal-title" id="undeservedLabel">Show Undeserved areas</span>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" style="min-height: 150px;">
            <br>
            <div class="col-md-12">
              <div class="col-md-6">
                Buffer
                <select class="form-control" v-model="undeserved.buffer">
                  <option v-for="item in selected_checkboxes" :value="item" :key="item">
                   {{ item }}
                  </option>
                </select>
              </div>
              <div class="col-md-6">
                Map
                <select class="form-control" v-model="undeserved.level">
                  <option v-for="item in ['Zone', 'Circle', 'Ward']" :value="item" :key="item">
                   {{ item }}
                  </option>
                </select>
              </div>
            </div>
            <br>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="loadUndeservedBoundary('GHMC', 'Zone', $event)">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as jsPDF from 'jspdf'
  import html2canvas from 'html2canvas'
  import NavBar from '../layouts/NavBar.vue'
  export default {
    data() {
      return {
        filters: {
          boundaries: [],
          assets: [],
          grievances: [],
          heatmaps: [],
          bufferRadius: {}
        },
        ajaxLoader: true,
        selected_checkboxes: [],
        areas: [],
        bufferRadiusCircle: [],
        markers: [],
        boundaries: [],
        accessToken: localStorage.getItem('accessToken'),
        colorCodeRange: [],
        trafficLayer: '',
        undeserved: {}
      }
    },
    components: {
      'nav-bar': NavBar
    },
    methods: {
      create_folder() {
        alert(' Inside create folder function.')
      },
      downloadPdf() {
        var element = $('#lakeer-map');
        var pdfOptions = {
            orientation: "portrait", // One of "portrait" or "landscape" (or shortcuts "p" (Default), "l")
            unit: "pt",              //Measurement unit to be used when coordinates are specified. One of "pt" (points), "mm" (Default), "cm", "in"
            format: "a4"            //One of 'a3', 'a4' (Default),'a5' ,'letter' ,'legal'
        };
        var doc = new jsPDF(pdfOptions);

        var pageWidth = doc.internal.pageSize.width-20;
        var width  =  pageWidth;
        html2canvas(document.querySelector("#lakeer-map"), {
          useCORS: true,
          async:false
        }).then(canvas => {
          var imgWidth = element[0].offsetWidth
          var imgHeight = element[0].offsetHeight
          var height =  (pageWidth * imgHeight)/ imgWidth
          doc.addImage(canvas, 'PNG', 10, 30 , 550, 550);
          doc.save('lakeer.pdf');
        });
      },
      addFilter(target, filterType, id) {
        if (target.checked) {
          if (this.filters[filterType]) {
            this.filters[filterType].push(String(id, 10));
          } else {
            this.filters[filterType] = [String(id, 10)];
          }
        } else {
          if (this.filters[filterType]) {
            this.filters[filterType] = this.filters[filterType].filter(t => t != id);
          }
        }
      },
      updateUrlParam() {
        var obj = this.filters
        var str = Object.keys(obj).map(function(key) {
          if (obj[key].constructor === Array) {
            return obj[key].map(function(value) {
              return key + '=' + value
            }).join('&');
          }
        }).join('&');
        window.history.replaceState(null, null, "?"+str);
      },
      loadBoundary(boundary_name, boundary_type, event) {
        var map = this.map
        if (event.isTrusted) {
          this.addFilter(event.target, 'boundaries', boundary_name.toLowerCase()+boundary_type)
          this.updateUrlParam()
        }
        if (event.target.checked) {
          this.areas.push(event.target.value)
          // NOTE: This uses cross-domain XHR, and may not work on older browsers.
      	  var boundary_layer = map.data
          boundary_layer.loadGeoJson(
            this.$http.options.root+'departments?token='+this.accessToken+'&department_name='+boundary_name+'&type='+boundary_type
          );
          this.boundaries.push(boundary_layer)
          map.data.addListener('mouseover', function(e) {
    		    map.data.overrideStyle(e.feature, {
    		      strokeColor: '#2a2a2a',
    		      strokeWeight: 2,
    		      zIndex: 2
    		    });
    		  });
          map.data.addListener('mouseout', function(e) {
    		    map.data.revertStyle();
    		  });
          var infoWindow = new google.maps.InfoWindow({
    		    content: ""
    		  });
    		  map.data.addListener('click', function(e) {
    		    // console.log(e.feature);
    		    infoWindow.setContent('<div style="line-height:1.00;overflow:hidden;white-space:nowrap;">' +'Name: '+
    		      e.feature.getProperty('name') + '<br> Type: ' +
    		      e.feature.getProperty('type') + '</div>');

    		    var anchor = new google.maps.MVCObject();
    		    anchor.set("position", e.latLng);
    		    infoWindow.open(map, anchor);
    		  });

        } else {
          var boundaryUnchecked = event.target.value
          // console.log(boundaryUnchecked)
          this.areas.pop(event.target.value)
          map.data.forEach(function(feature) {
            if (boundaryUnchecked == feature.f.type) {
              map.data.remove(feature);
            }
          });
        }

      },
      loadUndeservedBoundary(boundary_name, boundary_type, event) {
        var radius = this.filters.bufferRadius[this.undeserved.buffer]
        var service_metric_value = this.undeserved.buffer
        // this.selected_checkboxes.map((value, index) => {
        //   service_metric_params += '&service_metric_hole_names[]='+value
        //   radius = this.filters.bufferRadius[this.selected_checkboxes[index]]
        // })
        var map = this.map
        // Remove Existing layers
        map.data.forEach(function(feature) {
          map.data.remove(feature);
        });
        for(var i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null)
          this.removeBufferCircle(this.markers[i].service_metric)
        }

        // if (event.isTrusted) {
        //   this.addFilter(event.target, 'boundaries', boundary_name.toLowerCase()+boundary_type)
        //   this.updateUrlParam()
        // }
        this.areas.push(event.target.value)
        // NOTE: This uses cross-domain XHR, and may not work on older browsers.
    	  var boundary_layer = map.data
        boundary_layer.loadGeoJson(
          this.$http.options.root+'departments?token='+this.accessToken+'&department_name='+boundary_name+'&type='+this.undeserved.level+'&radius='+radius+'&service_metric_hole_names[]='+service_metric_value
        );

        this.boundaries.push(boundary_layer)
        map.data.addListener('mouseover', function(e) {
  		    map.data.overrideStyle(e.feature, {
  		      strokeColor: '#2a2a2a',
  		      strokeWeight: 2,
  		      zIndex: 2
  		    });
  		  });
        map.data.addListener('mouseout', function(e) {
  		    map.data.revertStyle();
  		  });
        var infoWindow = new google.maps.InfoWindow({
  		    content: ""
  		  });
  		  map.data.addListener('click', function(e) {
  		    // console.log(e.feature);
  		    infoWindow.setContent('<div style="line-height:1.00;overflow:hidden;white-space:nowrap;">' +'Name: '+
  		      e.feature.getProperty('name') + '<br> Type: ' +
  		      e.feature.getProperty('type') + '</div>');

  		    var anchor = new google.maps.MVCObject();
  		    anchor.set("position", e.latLng);
  		    infoWindow.open(map, anchor);
  		  });

      },
      loadResource(resource_name, resource_type, event) {
        var map = this.map
        if (event.isTrusted) {
          this.addFilter(event.target, 'boundaries', resource_name.toLowerCase()+resource_type)
          this.updateUrlParam()
        }
        if (event.target.checked) {
          this.areas.push(event.target.value)
          // NOTE: This uses cross-domain XHR, and may not work on older browsers.
      	  var resource_layer = map.data
          resource_layer.loadGeoJson(
            this.$http.options.root+'public_resources?token='+this.accessToken+'&resource_name='+resource_name+'&resource_type='+resource_type
          );
          // this.resources.push(resource_layer)
          // this.$http.get('public_resources?token='+this.accessToken+'&resource_name='+resource_name+'&resource_type='+resource_type)
          //     .then(response => {
          // var flightPlanCoordinates = [
          //   {lat: 37.772, lng: -122.214},
          //   {lat: 21.291, lng: -157.821},
          //   {lat: -18.142, lng: 178.431},
          //   {lat: -27.467, lng: 153.027}
          // ];
          // var flightPath = new google.maps.Polyline({
          //   path: flightPlanCoordinates,
          //   geodesic: true,
          //   strokeColor: '#FF0000',
          //   strokeOpacity: 1.0,
          //   strokeWeight: 2
          // });

          // flightPath.setMap( this.map);
          map.data.addListener('mouseover', function(e) {
    		    map.data.overrideStyle(e.feature, {
    		      strokeColor: '#2a2a2a',
    		      strokeWeight: 2,
    		      zIndex: 2
    		    });
    		  });
          map.data.addListener('mouseout', function(e) {
    		    map.data.revertStyle();
    		  });
          var infoWindow = new google.maps.InfoWindow({
    		    content: ""
    		  });
    		  map.data.addListener('click', function(e) {
    		    // console.log(e.feature);
    		    infoWindow.setContent('<div style="line-height:1.00;overflow:hidden;white-space:nowrap;">' +'Name: '+
    		      e.feature.getProperty('name') + '<br> Type: ' +
    		      e.feature.getProperty('type') + '</div>');

    		    var anchor = new google.maps.MVCObject();
    		    anchor.set("position", e.latLng);
    		    infoWindow.open(map, anchor);
    		  });

        } else {
          var boundaryUnchecked = event.target.value
          // console.log(boundaryUnchecked)
          this.areas.pop(event.target.value)
          map.data.forEach(function(feature) {
            if (boundaryUnchecked == feature.f.type) {
              map.data.remove(feature);
            }
          });
        }
      },
      loadTrafficLayer(event) {
        if (event.target.checked) {
          this.trafficLayer = new google.maps.TrafficLayer();
          this.trafficLayer.setMap(this.map);
        } else {
          this.trafficLayer.setMap(null);
        }
      },
      loadMarker(service_category, service_type, service_metric, event) {
        if (event.isTrusted) {
          this.addFilter(event.target, 'assets', event.target.dataset.ref)
          this.updateUrlParam()
        }
        console.log("Filter",this.filters)
        if (event.target.checked) {
          this.ajaxLoader = true
          this.selected_checkboxes.push(service_metric)
          var locations = [];
          this.$http.get('service_metrics?token='+this.accessToken+'&service_category='+service_category+'&service_type='+service_type+'&service_metric='+service_metric)
              .then(response => {
                var features = response.body.features
                var infowindow = new google.maps.InfoWindow();
                var marker, i;
                for (i = 0; i < features.length; i++) {
                  var custom_marker = {
                    url: 'https://s3.amazonaws.com/platform.lakeer.org/map-marker-icons/'+service_metric+'.png',
                    scaledSize: new google.maps.Size(10, 10)
                  };
                  marker = new google.maps.Marker({
                    position: new google.maps.LatLng(features[i].geometry.coordinates[1],features[i].geometry.coordinates[0]),
                    map: this.map,
                    icon: custom_marker,
                    service_metric: service_metric
                  });
                  this.markers.push(marker);
                  google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                      var info_text = "<p><b> Name : </b>" + features[i].basic_details.name + "</p>"
                      var properties = features[i].properties
                      for (var key in properties) {
                        console.log(key, properties[key]);
                        info_text += "<p><b> " + key + " : </b>" + properties[key] + "</p>"
                      }
                      infowindow.setContent(info_text);
                      infowindow.open(this.map, marker);
                    }
                  })(marker, i));
                }
                this.ajaxLoader = false
              }, error => {
                console.log("Error", error)
              })

        } else {
          this.selected_checkboxes = this.selected_checkboxes.filter(function(ele){
              return ele != service_metric;
          });
          for(var i = 0; i < this.markers.length; i++) {
            // console.log(this.markers[i].service_metric)
            if (service_metric == this.markers[i].service_metric) {
              this.markers[i].setMap(null)
            }
          }
          this.removeBufferCircle(service_metric)
        }

      },
      loadGrievance(grievance_type, event) {
        if (event.target.checked) {
          if (event.isTrusted) {
            this.addFilter(event.target, 'grievances', grievance_type)
            this.updateUrlParam()
          }
          var locations = [];
          this.selected_checkboxes.push(grievance_type)
          this.$http.get('grievances?token='+this.accessToken+'&grievance_type='+grievance_type)
              .then(response => {
                var features = response.body.features
                var infowindow = new google.maps.InfoWindow();
                var marker, i;
                for (i = 0; i < features.length; i++) {
                  var custom_marker = {
                    url: 'https://s3.amazonaws.com/platform.lakeer.org/map-marker-icons/hyderabad_mmts_stops.png',
                    scaledSize: new google.maps.Size(10, 10)
                  };
                  marker = new google.maps.Marker({
                    position: new google.maps.LatLng(features[i].geometry.coordinates[1],features[i].geometry.coordinates[0]),
                    map: this.map,
                    icon: custom_marker,
                    grievance_type: grievance_type
                  });
                  this.markers.push(marker);
                  google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                      console.log(features[i].properties.remark)
                      // infowindow.setContent("Some message")
                      infowindow.setContent("<p><b> Category : </b>" + features[i].properties.category + "</p>" +
                                        "<p><b> Sub Category :</b> " + features[i].properties.sub_category + "<p>" +
                                        "<p><b> Remark :</b> " + features[i].properties.remark + "</p>");
                      infowindow.open(this.map, marker);
                    }
                  })(marker, i));
                }
                this.ajaxLoader = false
              }, error => {
                console.log("Error", error)
              })
        } else {
          this.selected_checkboxes = this.selected_checkboxes.filter(function(ele){
              return ele != grievance_type;
          });
          for(var i = 0; i < this.markers.length; i++) {
            // console.log(this.markers[i].service_metric)
            if (grievance_type == this.markers[i].grievance_type) {
              this.markers[i].setMap(null)
            }
          }
        }

      },
      loadBufferRadius(service_metric) {
        this.ajaxLoader = true;
        this.removeBufferCircle(service_metric)
        console.log("bufferRadius",service_metric, this.filters.bufferRadius[service_metric])
        var bufferColor = {
            "hyderabad_bus_stops": '#004de8',
            "rs_5_meal_canteens": '#6c8a5d'
          }
        setTimeout(() => {
          this.runLoop(service_metric, bufferColor);
          this.ajaxLoader = false;
        }, this.markers.length * 2)

      },
      runLoop(service_metric, bufferColor) {
        for (var i = 0; i < this.selected_checkboxes.length; i++) {
          for (var i = 0; i < this.markers.length; i++) {
            let earthRadii = {
              mi: 3963.1676,
              km: 6378.1,
              ft: 20925524.9,
              mt: 6378100,
              "in": 251106299,
              yd: 6975174.98,
              fa: 3487587.49,
              na: 3443.89849,
              ch: 317053.408,
              rd: 1268213.63,
              fr: 31705.3408
            };
            let circle, radius, select, unitKey;
            unitKey = 'km';
            radius = this.filters.bufferRadius[service_metric];
            radius = (radius / earthRadii[unitKey]) * earthRadii['mt'];
            // console.log('Inside selected checkbox', i)
            if (this.markers[i].service_metric == service_metric) {
              circle = new google.maps.Circle({
                center: new google.maps.LatLng(this.markers[i].position.lat(), this.markers[i].position.lng()),
                clickable: true,
                draggable: false,
                editable: false,
                fillColor: '#4baf50',
                fillOpacity: 0.5,
                map: this.map,
                radius: radius,
                strokeColor: '#4baf50',
                strokeOpacity: 0.62,
                strokeWeight: 1,
                service_metric: service_metric
              });
              this.bufferRadiusCircle.push(circle)
            }
          }
        }
      },
      loadHeatMap(service_type, type) {
        if (this.boundaries.length > 0 && event.target.checked) {
          this.$http.get('service_metrics/asset_numpoints?token='+this.accessToken+'&service_type='+service_type+'&level_type='+this.areas[0]+'&type='+type)
              .then(response => {
                var raw_response = response.body
                // console.log(raw_response)
                var numpoints_arr = raw_response.map(x => x.numpoint_count);
                // console.log(numpoints_arr)
                var maxValue = numpoints_arr.reduce((a, b) => a + b, 0) / numpoints_arr.length // Getting Average of numpoint
                var color_range = this.createHeatMapColor(0,5,0,maxValue)
                this.colorCodeRange = color_range
                for(var i = 0; i < this.boundaries.length; i++){
                  // console.log(this.boundaries[i])
                  this.boundaries[i].setStyle(function(feature) {
                    // console.log("Inside set style feature", feature)
                    return {
                      fillColor: getColorCode(feature.f.name, raw_response, color_range), // call function to get color for state based on the COLI (Cost of Living Index)
                      fillOpacity: 0.8,
                      strokeColor: '#b3b3b3',
                      strokeWeight: 1,
                      zIndex: 1
                    };
                  });
                }

                // console.log(color_range)
              }, error => {
                console.log("Error", error)
              })
        } else if (this.boundaries.length == 0) {
          event.preventDefault()
          alert("Please load the boundary layer first to perform this action")
        } else {
          this.colorCodeRange = []
          this.map.data.setStyle()
          console.log('Inside the else condition')
        }
      },
      createHeatMapColor(minRange, maxRange, min, max) {
        var colors = ["#435D36", "#8AA37B", "#C0D9AF", "#CDC8B1", "#CD8500", "#C73F17"]
        var scales = [],                  // Prepare some variables
        ranges = maxRange+1 - minRange,   // Amount of elements to be returned.
        range  = (max-min)/ranges;        // Difference between min and max
        for(var i = 0; i < ranges; i++){
            scales.push({
                range: i+minRange,        // Current range number
                min: (min + range * i).toFixed(1),
                max: (min + range * (i+1)).toFixed(1),
                color_code: colors[i]
            });
            console.log("Color code", colors[i])
        }
        return scales;
      },
      getColorCode() {
        return "#435D36";
      },
      removeBufferCircle(service_metric) {
        for (var i = 0; i < this.bufferRadiusCircle.length; i++) {
          if (service_metric == this.bufferRadiusCircle[i].service_metric) {
            this.bufferRadiusCircle[i].setMap(null)
          }
        }
      },
      initMap() {
        this.map = new google.maps.Map(document.getElementById('lakeer-map'), {
              center: {lat: 17.42, lng: 78.3867},
              zoom: 11.8,
              styles:
                [
                  {
                    "stylers": [
                      {
                        "saturation": -100
                      }
                    ]
                  },
                  {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [
                      {
                        "color": "#0099dd"
                      }
                    ]
                  },
                  {
                    "elementType": "labels",
                    "stylers": [
                      {
                        "visibility": "off"
                      }
                    ]
                  },
                  {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [
                      {
                        "color": "#aadd55"
                      }
                    ]
                  },
                  {
                    "featureType": "road.highway",
                    "elementType": "labels",
                    "stylers": [
                      {
                        "visibility": "on"
                      }
                    ]
                  },
                  {
                    "featureType": "road.arterial",
                    "elementType": "labels.text",
                    "stylers": [
                      {
                        "visibility": "on"
                      }
                    ]
                  },
                  {
                    "featureType": "road.local",
                    "elementType": "labels.text",
                    "stylers": [
                      {
                        "visibility": "on"
                      }
                    ]
                  },
                  {}
                ]
              })
      },
      initFilter() {
        var query = this.$router.history.current.query
        if (typeof(query.boundaries) == "string"){
          this.$refs[query.boundaries].click()
          this.filters.boundaries.push(query.boundaries)
        } else if (typeof(query.boundaries) == "object"){
          query.boundaries.map((value, index) => {
            this.$refs[value].click()
          })
          this.filters.boundaries = query.boundaries
        }
        if (typeof(query.assets) == "string") {
          this.$refs[query.assets].click()
          this.filters.assets.push(query.assets)
        } else if (typeof(query.assets) == "object"){
          query.assets.map((value, index) => {
            this.$refs[value].click()
          })
          this.filters.assets = query.assets
        }
        if (typeof(query.grievances) == "string") {
          this.$refs[query.grievances+'Grievance'].click()
          this.filters.grievances.push(query.grievances)
        } else if (typeof(query.grievances) == "object"){
          query.grievances.map((value, index) => {
            this.$refs[value+'Grievance'].click()
          })
          this.filters.grievances = query.grievances
        }
      }
    },
    mounted(){
      this.initMap()
      this.initFilter()
    }
  }
</script>
