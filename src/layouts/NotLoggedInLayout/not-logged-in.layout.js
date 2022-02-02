import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withTranslation, useTranslation } from 'react-i18next';
import { NavBar } from '@components';
import { withWebId } from '@inrupt/solid-react-components';
import { LanguageDropdown } from '@util-components';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const NotLoggedInLayout = props => {
  const { component: Component, webId, ...rest } = props;
  const { t } = useTranslation();
  const ComponentWrapper = styled(Component)`
    padding-bottom: 60px;
    height: 100%;
    padding-top: 45px;
  `;
  return !webId ? (
    <Route
      {...rest}
      component={matchProps => (
        <Container>
          <NavBar
            {...matchProps}
            toolbar={[
              {
                component: () => <LanguageDropdown {...{ t, ...props }} />,
                id: 'language'
              }
            ]}
          />
          <ComponentWrapper {...matchProps} />
        </Container>
      )}
    />
  ) : (
    <Redirect to="/welcome" />
  );
};

export default withTranslation()(withWebId(NotLoggedInLayout));
