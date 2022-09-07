import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import cn from 'classnames';

const Footer = () => (
  <footer className="sticky-footer">
    <div className="my-auto">
      <div
        className={cn(
          'pt-1',
          'pb-1',
          'pl-4',
          'pr-4',
          'panel',
          'footer_layer',
        )}
      >
        <div />
        <div>
          <span>
            <FormattedMessage
              id="app.name"
              defaultMessage="App name"
            />
          </span>
          <span>
            ©{' '}
            <FormattedMessage
              id="app.company.name"
              defaultMessage="Your company"
            />
            , {new Date().getFullYear()}
          </span>
          <span>
            <b>v 0.0.1</b>
          </span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
