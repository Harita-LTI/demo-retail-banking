import React from 'react';
import styled from 'styled-components';
import SideMenu from './SideMenu';
import Overview from './Overview';
import Transactions from './TransactionList';
// import QuickTransfers from './QuickTransfers';
import Cards from './Cards';
import NavBar2 from '../../common/Navbar2';
import RegulatoryFooter from '../../common/RegulatoryFooter';

const DashboardContainer = styled.div`
  display: flex;
  margin-top: 5.8em;
`;

const DashboardContent = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 2fr 1fr;
  background-color: #f4f5f7;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function Dashboard() {
  return (
    <>
      <div style={{ "position": "fixed", "top": "0", "zIndex": "3" }}>
        <NavBar2 />
      </div>
      <DashboardContainer>
        <SideMenu />
        <DashboardContent>
          <MainContent>
            <Overview />
            <Transactions />
          </MainContent>
          <RightSidebar>
            {/* <QuickTransfers /> */}
            <Cards />
          </RightSidebar>
        </DashboardContent>
      </DashboardContainer>
      <RegulatoryFooter />
    </>
  );
}

export default Dashboard;
