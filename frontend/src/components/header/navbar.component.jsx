import React from 'react';
import Breadcrumbs from '../share/breadcrumbs.component';
import Company from '../../utilities/company.component';
import { FormattedMessage } from 'react-intl';
import Divider from '@material-ui/core/Divider';
import '../share/share.style.scss';
import '../notifications/notifications.scss';
import cn from 'classnames';
import { NotificationsWidgetContainer } from '../notifications';
import Language from './Language';

// логотип с надписью наверху слева в каждой странице
const Navbar = () => (
  <>
    <div id="wrapper2">
      <nav
        className={cn(
          'navbar',
          'navbar-expand',
          'navbar-dark',
          'static-top',
        )}
      >
        <div className="navlogo">
          <a
            className={cn('navbar-brand', 'mr-1')}
            href="/"
          >
            <img src="/img/logo-elk.png" alt="" />
            <div>
              <FormattedMessage
                id="app.name"
                defaultMessage="Единый Личный Kабинет"
              />
            </div>
          </a>
        </div>
      </nav>
      <div className="navbar_layer">
        {/* здесь выводим хлебные крошки */}
        <div className={cn('panel', 'p_25-1_25-1')}>
          <div>
            <ul
              className={cn(
                'navbar-nav',
                'ml-auto',
                'mr-0',
                'mr-md-3',
                'my-2',
                'my-md-0',
              )}
            >
              <li className="breadcrumbs">
                <Breadcrumbs />
              </li>
            </ul>
          </div>
          <Divider variant="middle" flexItem />
        </div>

        <div
          className={cn(
            'pl-2',
            'pr-2',
            'items-panel',
            'notifies-mainpage',
          )}
        >
          <Company />
          <NotificationsWidgetContainer />
          <Language />
        </div>
      </div>
    </div>
  </>
);

export default Navbar;
