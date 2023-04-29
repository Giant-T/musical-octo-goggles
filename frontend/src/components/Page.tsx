import { PropsWithChildren } from 'react';
import {
  AppShell,
  Header,
  Footer,
  Text,
  useMantineTheme,
  Divider,
  Group,
} from '@mantine/core';
import { Link } from 'react-router-dom';

export default function Page(props: PropsWithChildren) {
  const theme = useMantineTheme();
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      footer={
        <Footer height={60} p="md">
          William Boudreault ©2023
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <Group style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Text>Projet Final</Text>
            <Divider orientation='vertical' />
            <Link to="/">Accueil</Link>
            <Link to="/activation">Activation</Link>
          </Group>
        </Header>
      }
    >
      {props.children}
    </AppShell>
  );
}
