import { Suspense, useEffect, useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Home,
  Register,
  Login,
  Activity,
  Promotion,
  Wallet,
  Account,
  AboutUs,
  Language,
  Notification,
  CustomerService,
  BeginnerGuide,
  Download,
  Games,
  // GameCategory,
  Game,
  GameHistory,
  Transaction,
  Deposit,
  Withdraw,
  Settings,
  Feedback,
  AddBankAccount,
  DepositHistory,
  WithdrawHistory,
  ChangePassword,
  ForgotPassword,
  Subordinate,
  CommissionDetails,
  InvitationRules,
  NotificationPage,
  GiftPage,
  GameStatistics,
  BindMailPage,
  BalancePoller,
  ChangeFirstPassword
} from "./pages";

import { Loader, Footer, PageContainer, AlertBox } from "./components";
import PromotionLayout from "./routes/PromotionLayout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import LayoutRoute from "./routes/LayoutRoute.jsx";
import { authService } from "./utils";
import { userDataActions } from "./store";
import Reward from "./pages/reward/page.js";

const LayoutHandler = () => {
  const [showLayout, setShowLayout] = useState(true);

  const { isAuthenticated } = useSelector((store) => store.userData);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const shouldHideLayout = ["/register", "/login", "/change-password", "/forgot-password", "/customer-service"].some((route) =>
      location.pathname.startsWith(route)
    );
    setShowLayout(!shouldHideLayout);

    const hashPath =
      window.location.href[window.location.href.length - 1] === "#"
        ? true
        : false;

    if (hashPath) {
      navigate("/");
    }
  }, [location, navigate]);

  useEffect(() => {
    const root = document.getElementById("root");
    if (location.pathname.includes("virtual-games/dice")) {
      root.classList.add("overlay-dice");
    } else {
      root.classList.remove("overlay-dice");
    }
  }, [location.pathname]);


  return (
    <>
      <PageContainer>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Normal Routes for All Visitors */}
            <Route path="/" element={<Home />} />

            {/* Protected Routes for Authentication */}
            <Route
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  isUserAllowed={false}
                />
              }
            ></Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangeFirstPassword />} />
            <Route path="/customer-service" element={<CustomerService />} />
            <Route path="/promotion/reward" element={<Reward />} />


            {/* Protected Routes for Logged Users */}
            <Route
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  isUserAllowed={true}
                />
              }
            >
              <Route path="/activity" element={<Activity />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/promotion" element={<PromotionLayout />}>
                <Route index element={<Promotion />} />
                <Route path="subordinate" element={<Subordinate />} />
                <Route path="commission-detail" element={<CommissionDetails />} />
                <Route path="invitation-rules" element={<InvitationRules />} />
              </Route>

              <Route path="/wallet" element={<Wallet />} />

              <Route path="/account/:id" element={<LayoutRoute />}>
                <Route index element={<Account />} />
                <Route path="deposit" element={<Deposit />} />
                <Route path="withdraw" element={<Withdraw />} />
                <Route path="add-bank-account" element={<AddBankAccount />} />
                <Route path="game-history" element={<GameHistory />} />
                <Route path="transaction-history" element={<Transaction />} />
                <Route path="deposit-history" element={<DepositHistory />} />
                <Route path="withdraw-history" element={<WithdrawHistory />} />
                <Route path="settings" element={<Settings />} />
                <Route path="change-password" element={<ChangePassword />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="bind-mail" element={<BindMailPage />} />
                <Route path="messages" element={<NotificationPage />} />
                <Route path="gifts" element={<GiftPage />} />
                <Route path="game-statistics" element={<GameStatistics />} />
                <Route path="language" element={<Language />} />
              </Route>
              
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/language" element={<Language />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/beginner-guide" element={<BeginnerGuide />} />
              <Route path="/download" element={<Download />} />
              <Route path="/games" element={<LayoutRoute />}>
                <Route index element={<Games />} />
                <Route path=":gameCategory/:gameName" element={<Game />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </PageContainer>
      {showLayout && <Footer />}
    </>
  );
};

const App = () => {
  const { isCheckingAuth } = useSelector((store) => store.userData);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const checkAuth = async () => {
      // const response = checkAuth();
      const response = await authService.checkAuth();
      if (response) {
        dispatch(userDataActions.updateUser(response));
      } else {
        dispatch(userDataActions.updateUser());
      }
    };
    checkAuth();
  }, [dispatch]);

  return isCheckingAuth ? (
    <Loader />
  ) : (
    <Router>
      <AlertBox />
      <BalancePoller />
      <LayoutHandler />
    </Router>
  );
};

export default App;
