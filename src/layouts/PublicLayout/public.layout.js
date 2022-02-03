import React from 'react';
import { Route, Link } from 'react-router-dom';
import { useWebId } from '@inrupt/solid-react-components';
import styled from 'styled-components';
import { NavBar, AuthNavBar } from '@components';
import { LanguageDropdown } from '@util-components';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  min-height: 100%;
  position: relative;
`;

const PublicLayout = props => {
  const webId = useWebId();
  const { component: Component, ...rest } = props;
  const { t, i18n } = useTranslation();
  const ComponentWrapper = styled(Component)`
    padding-bottom: 60px;
    height: 100%;
    padding-top: 60px;
  `;

  return (
    <Route
      {...rest}
      component={({ history, location, match }) => {

        return (
        <Container>
          {webId && (
            <AuthNavBar {...{ history, location, match, webId }} />
          )}
          <ComponentWrapper {...{ history, location, match }} />
        </Container>
      )
      }}
    />
  );
};

export default PublicLayout;
