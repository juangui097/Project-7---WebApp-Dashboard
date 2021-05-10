// ----- BUTTTONS
const emailNotifications = document.querySelector('#email-toggle');
const profileToPublic = document.querySelector('#profile-toggle');
var select = document.querySelector("#selectMenu");
const save = document.querySelector('#save');
const cancel = document.querySelector('#cancel');
// ----- CHECKING FOR LOCAL STORAGE
const settingsData = () => {
  const emailHasLocalStorage = localStorage.getItem('emailSettings');
  const profileHasLocalStorage = localStorage.getItem('profileSettings');
  let supportsEmail = false;
  let supportsProfile = false;
  let supportsEmailSettings = undefined;
  let supportsProfileSettings = undefined;
    // emailStorage
  if (emailHasLocalStorage === 'defaultEmail') {
    supportsEmailSettings = 'defaultEmail';
  }if (emailHasLocalStorage === 'emailOn') {
    supportsEmailSettings = 'emailOn';
  }// profileStorage
  if (profileHasLocalStorage === 'defaultProfile') {
    supportsProfileSettings = 'defaultProfile';
  }if (profileHasLocalStorage === 'profileOn') {
    supportsProfileSettings = 'profileOn';
  }
  return {supportsEmail, supportsEmailSettings, supportsProfile, supportsProfileSettings};
}
const emailSettingsPreference = settingsData();
const profileSettingsPreference = settingsData();
/************************************************************************************************/
// ----- REMEMBER SETTINGS
const rememberEmailSettings = () => {
  switch(emailSettingsPreference.supportsEmailSettings) {
    case 'emailOn':
      emailNotifications.checked = true;
      break;
    case 'defaultEmail':
      emailNotifications.checked = false;
      break;
  }
}
const rememberProfileSettings = () => {
  switch(profileSettingsPreference.supportsProfileSettings) {
    case 'profileOn':
      profileToPublic.checked = true;
      break;
    case 'defaultProfile':
      profileToPublic.checked = false;
      break;
  }
}
rememberEmailSettings();
rememberProfileSettings();
/************************************************************************************************/
// ----- CLICK FUNCTIONS
emailNotifications.addEventListener('click', e => {
  if (emailNotifications.checked) {
    localStorage.setItem('emailSettings', 'emailOn');
  } else {
    localStorage.setItem('emailSettings', 'defaultEmail');
  }
});
profileToPublic.addEventListener('click', e => {
  if (profileToPublic.checked) {
    localStorage.setItem('profileSettings', 'profileOn');
  } else {
    localStorage.setItem('profileSettings', 'defaultProfile');
  }
});
save.addEventListener('click', ()  => {
  var selectOption = select.selectedIndex;
  if (selectOption > 0) {
    localStorage.setItem('select', selectOption);
  }
});
if (localStorage.getItem('select')) {
 const selectedTimezone = localStorage.getItem('select');
 select.selectedIndex = selectedTimezone;
 const displayOptions = document.querySelectorAll('.select-items > div');
 const selectedDisplayOption = displayOptions[selectedTimezone - 1];
 selectedDisplayOption.classList.add('same-as-selected');
 document.querySelector('.select-selected').textContent = selectedDisplayOption.textContent;
}

// CANCEL OPTION
cancel.addEventListener('click', e => {
  localStorage.removeItem('emailSettings');
  localStorage.removeItem('profileSettings');
  localStorage.removeItem('select');
  console.info('local storage cleared');
});
