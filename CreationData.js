import './global.js'

var templatesClean = [];
var templatesApps = [];
var plans = [];


class CreationManager {
  
  GetCreationData = async () => {
    
    console.log('yes trying to get creation data');
    //Have a try and catch block for catching errors.
    try {
        fetch('https://www.skysilk.com/api_v2/user/VM/getCreationData', {
              method: 'GET',
              credentials: 'include',
              headers: {
              'Content-Type': 'text/plain',
              'Set-Cookie':  global.csrf_token,
              'Set-Cookie': global.ci_session,
              },
              
              
              
              }).then((response) => response.json())
        .then((res) => {
              if(typeof(res.message) != "undefined"){
              Alert.alert("Error", "Error: "+ res.message);
              }
              else{
              var resStr = JSON.stringify(res);
              
              /*
               this.setState({ auth_token: res.auth_token });
               */
              if(res.status == '403'){
              Alert.alert("Forbidden", " 403 for vms");
              }
              else {
              
              plans = res['AVAILABLE_PLANS'];
              
              var templates = res['AVAILABLE_TEMPLATES_LXC'];
              
              var datacenters = res['DATACENTERS'];
              
              for(var i = 0; i < datacenters.length; i++){
              
              var thisDataCenter = datacenters[i];
              
              var dataCenterPlans = [];
              var setPlans = false;
              
              var clusters = thisDataCenter.clusters;
              for(var c = 0; c < clusters.length; c++){
              
              var thisCluster = clusters[c];
              var vmClasses = thisCluster.VmClasses;
              
              var clusterHardware = thisCluster.hardware;
              
              var maxClusterCpu = 0;
              var maxClusterRam = 0;
              var maxClusterDisk = 0;
              var maxClusterBandwidth = 0;
            
              
              var maxBasicCpu = 0;
              var maxBasicRam = 0;
              var maxBasicDisk = 0;
              var maxBasicBandwidth = 0;
        
              
              var maxStandardCpu = 0;
              var maxStandardRam = 0;
              var maxStandardDisk = 0;
              var maxStandardBandwidth = 0;
            
              
              var maxPremiumCpu = 0;
              var maxPremiumRam = 0;
              var maxPremiumDisk = 0;
              var maxPremiumBandwidth = 0;
           
              
              for(var h = 0; h < clusterHardware.length; h++){
              
              var thisHardware = clusterHardware[h];
              var limits = thisHardware.limits;
              
              var thisCpu = limits.CPU;
              var thisRam = limits.RAM;
              var thisDisk = limits.Disk;
              var thisBandwidth = limits.Bandwidth;
            
              
              if(maxClusterCpu < thisCpu){
              maxClusterCpu = thisCpu;
              }
              
              if(maxClusterRam < thisRam){
              maxClusterRam = thisRam;
              }
              
              if(maxClusterDisk < thisDisk){
              maxClusterDisk = thisDisk;
              }
              
              if(maxClusterBandwidth < thisBandwidth){
              maxClusterBandwidth = thisBandwidth;
              }
              
             
              
              
              }
              
              for(var v = 0; v < vmClasses.length; v++){
              
              var checkClass = vmClasses[v];
              
              if(checkClass == 1){
              
              if(maxBasicCpu < thisCpu){
              maxBasicCpu = thisCpu;
              }
              
              if(maxBasicRam < thisRam){
              maxBasicRam = thisRam;
              }
              
              if(maxBasicDisk < thisDisk){
              maxBasicDisk = thisDisk;
              }
              
              if(maxBasicDisk < thisDisk){
              maxBasicDisk = thisDisk;
              }
              
              if(maxBasicBandwidth < thisBandwidth){
              maxBasicBandwidth = thisBandwidth;
              }
              
              }
              
              if(checkClass == 2){
              
              if(maxStandardCpu < thisCpu){
              maxStandardCpu = thisCpu;
              }
              
              if(maxStandardRam < thisRam){
              maxStandardRam = thisRam;
              }
              
              if(maxStandardDisk < thisDisk){
              maxStandardDisk = thisDisk;
              }
              
              if(maxStandardBandwidth < thisBandwidth){
              maxStandardBandwidth = thisBandwidth;
              }
              
              }
              
              if(checkClass == 3){
              
              if(maxPremiumCpu < thisCpu){
              maxPremiumCpu = thisCpu;
              }
              
              if(maxPremiumRam < thisRam){
              maxPremiumRam = thisRam;
              }
              
              if(maxPremiumDisk < thisDisk){
              maxPremiumDisk = thisDisk;
              }
              
              if(maxPremiumBandwidth < thisBandwidth){
              maxPremiumBandwidth = thisBandwidth;
              }
              
              }
              }
              
              
             
              for(var p = 0; p < plans.length; p++){
              
             
              var checkThisPlan = plans[p];
          
              if(checkThisPlan.Name == 'Nano'){
              global.planTierOne = checkThisPlan.Id;
              console.log('setting nano id as ' + global.planTierOne);
              }
              if(checkThisPlan.Name == 'Micro'){
              global.planTierTwo = checkThisPlan.Id;
              }
              if(checkThisPlan.Name == 'Small'){
              global.planTierThree = checkThisPlan.Id;
              }
              if(checkThisPlan.Name == 'Medium'){
              global.planTierFour = checkThisPlan.Id;
              }
              if(checkThisPlan.Name == 'Large'){
              global.planTierFive = checkThisPlan.Id;
              }
              
              var availableOnBasic = true;
              var availableOnStandard = true;
              var availableOnPremium = true;
              
            
              var planObj;
              var shouldPush = false;
              if(!thisDataCenter.plans){
            
              var originalPlan = plans[p];
              planObj = JSON.parse(JSON.stringify(originalPlan));
              shouldPush = true;
              }
              else {
              
              planObj = thisDataCenter.plans[p];
              }
          
              var planCpu = planObj.CPU;
              var planRam = planObj.RAM;
              var planDisk = planObj.DiskSize;
              var planBasicBandwidth = planObj.Bandwidth[1].Amount;
              var planStandardBandwidth = planObj.Bandwidth[2].Amount;
              var planPremiumBandwidth = planObj.Bandwidth[3].Amount;
              
              if(maxClusterCpu < planCpu || maxClusterRam < planRam || maxClusterDisk < planDisk){
              availableOnBasic = false;
              availableOnStandard = false;
              availableOnPremium = false;
              }
              
              if(maxBasicBandwidth < planBasicBandwidth){
              
              availableOnBasic = false;
              
              }
              
              if(maxStandardBandwidth < planStandardBandwidth){
              
              availableOnStandard = false;
              
              }
              
              if(maxPremiumBandwidth < planPremiumBandwidth){
              
              availableOnPremium = false;
              
              }
              
             
              if(!planObj.availableOnBasic){
              planObj.availableOnBasic = availableOnBasic;
              }
              if(!planObj.availableOnStandard){
              planObj.availableOnStandard = availableOnStandard;
              }
              if(!planObj.availableOnPremium){
              planObj.availableOnPremium = availableOnPremium;
              }
              
              if(shouldPush){
              dataCenterPlans.push(planObj);
              }
              
              }
              
              thisDataCenter.plans = dataCenterPlans;
             
              
              }
              
              
              console.log('this datacenter id is ' + thisDataCenter.Id);
              if(thisDataCenter){
              if(!global.dataCenters){
              global.dataCenters = {};
              }
              global.dataCenters[thisDataCenter.Id] = thisDataCenter;
              }
              
              
              }
              
              for(var i = 0; i < templates.length; i++){
              
              var thisTemp = templates[i];
              
              
              
              if(thisTemp.Name == 'Brents Minecraft Shenanigans'){
              console.log('FOUND MC TEMP id is ' + thisTemp.Id);
              global.mainTemplateId = thisTemp.Id;
              }
              
             
             
           
              if(thisTemp.Setup == 'CLEAN'){
              
              templatesClean.push(thisTemp);
              }
              
              if(thisTemp.Setup == 'APPLIANCE'){
              
              templatesApps.push(thisTemp);
              }
              
              }
              
              global.appTemplates = templatesApps;
              global.cleanTemplates = templatesClean;
              global.plans = plans;
              
              for(var i = 0; i < templatesClean.length; i++){
             
              }
              }
              }
              }).catch((error) => {
                       console.error(error);
                       });
        
    } catch(err) {
        console.log("Error fetching data-----------", err);
    }
    
     if(global.mainTemplateId < 1){
              global.mainTemplateId = 116;
              }
      
              console.log('OOOOOOH MAIN TEMPLATE ID IS ' + global.mainTemplateId);
    
}
  
}

const creationManager = new CreationManager();
export default creationManager;


