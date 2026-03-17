/**
 * Track footer view event
 * Triggered when the footer is 100% in view for a certain duration
 * @param {string} context - 'search' for list page or machine name for detail page
 */
export const trackFooterView = (context) => {
  window.gtmDataObject = window.gtmDataObject || [];
  window.gtmDataObject.push({
    event: 'local_event', //as is, do not change!!
    local_event_category: 'machine assistance', 
	  local_event_action:'view need help', 
	  local_event_label:`${context}`,
    event_raised_by:'local_market_gr'
  });
//   console.log('GTM Event: machine assistance - need help -', context);
};

/**
 * Track service T&C link click in footer
 * Triggered when user clicks on the terms & conditions link
 */
export const trackServiceTCClick = () => {
  window.gtmDataObject = window.gtmDataObject || [];
  window.gtmDataObject.push({
    event: 'local_event', //as is, do not change!!
    local_event_category: 'machine assistance', 
    local_event_action:'click on service terms',
    local_event_label:'here',    
    event_raised_by:'local_market_gr'
  });
//   console.log('GTM Event: machine assistance - need help - service tc');
};

/**
 * Track register machine link click in footer
 * Triggered when user clicks on the "Register your machine" button
 */
export const trackRegisterMachineClick = () => {
  window.gtmDataObject = window.gtmDataObject || [];
  window.gtmDataObject.push({
    event: 'local_event', //as is, do not change!!
    local_event_category: 'machine assistance', 
    local_event_action:'click on machine registration',
    local_event_label:'register your machine',    
    event_raised_by:'local_market_gr'
  });
//   console.log('GTM Event: machine assistance - register your machine');
};
