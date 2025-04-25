import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import { configs } from './configs';

import { appointments } from './appointments';

import { AdminConfigs } from './administration';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [
    dashboard,
    pages,
    // utilities,
    // other,
    AdminConfigs, 
    configs,
    appointments
  ]
};

export default menuItems;
