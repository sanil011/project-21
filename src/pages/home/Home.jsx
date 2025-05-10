import { useEffect, useRef, useState } from "react";
import {
  BottomNavigationBox,
  Carousel,
  GameCategoryBox,
  Header,
  NoticeBox,
  TabBox,
  TermsBox,
  WinningInfoBox,
} from "../../components";
import TopCategoryTabs from "../../components/common/tab-box/TopCategoryTabs";
import { gameCategories } from "../../data";
import { Button } from "@mui/material";
import { SportsEsports } from "@mui/icons-material";
import { Link } from "react-router-dom";
import ConfirmPopup from "../../components/common/popup/confirm-popup"
const Home = () => {
  const [currentTab, setCurrentTab] = useState("");
  const [tabClickCount, setTabClickCount] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const triggerRef = useRef(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(true);

  const sectionRefs = {
    Popular: useRef(null),
    Lottery: useRef(null),
    Virtual: useRef(null),
    Jilli: useRef(null),
    Slots: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (triggerRef.current) observer.observe(triggerRef.current);

    return () => {
      if (triggerRef.current) observer.unobserve(triggerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true); // Prevent scroll on first load
      return;
    }
    const targetRef = sectionRefs[currentTab]?.current;
    if (targetRef) {
      setTimeout(() => {
        const root = document.getElementById("root");
        const rootTop = root?.getBoundingClientRect().top ?? 0;
        const elementTop = targetRef.getBoundingClientRect().top;
        const offset = isSticky ? 75 : 120; // Adjust based on header presence
        root?.scrollTo({
          top: root.scrollTop + elementTop - rootTop - offset,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [currentTab, tabClickCount]);

  const handleTabClick = (tab) => {
    if (tab === currentTab) {
      setTabClickCount((prev) => prev + 1);
    } else {
      setCurrentTab(tab);
    }
  };

  useEffect(() => {
    const confirmationModalShown = localStorage.getItem("confirmation-modal");
    if (confirmationModalShown === "true") {
      setIsConfirmationModalOpen(false);
    }
  }, []);

  
  const handleClose = () => {
    setIsConfirmationModalOpen(false);
    localStorage.setItem("confirmation-modal", "true");
  }

  return (
    <div className="">
      {!isSticky && <Header />}

      <div>
        <Carousel />
        <NoticeBox />

        {/* Observer trigger — right after NoticeBox */}
        <div ref={triggerRef} style={{ height: "1px" }} />

        {isSticky && (
          <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[400px] bg-[#0B0C2A] h-[50px]">
            <TopCategoryTabs currentTab={currentTab} changeTab={handleTabClick} />
          </div>
        )}

        <TabBox changeTab={handleTabClick} />

        {/* Game Category Sections */}
        {currentTab === "Popular" && (
          <div ref={sectionRefs["Popular"]}>
            {/* Render "Virtual" game category first */}
            <div ref={sectionRefs["Virtual"]}>
              <GameCategoryBox
                gameCategory={gameCategories[1]} // Assuming the Virtual category is at index 1
                currentTab={currentTab}
                changeTab={handleTabClick}
              />
            </div>

            {/* Render other game categories */}
            {gameCategories
              .filter((category, index) => index !== 1) // Exclude "Virtual" category
              .map((category) => (
                <GameCategoryBox
                  key={category.id}
                  gameCategory={category}
                  currentTab={currentTab}
                  changeTab={handleTabClick}
                />
              ))}
          </div>
        )}

        {currentTab === "" && (
          <div ref={sectionRefs["Popular"]}>
            {gameCategories.map((category) => (
              <GameCategoryBox
                key={category.id}
                gameCategory={category}
                currentTab={currentTab}
                changeTab={handleTabClick}
              />
            ))}
          </div>
        )}

        {currentTab === "Lottery" && (
          <div ref={sectionRefs["Lottery"]}>
            <GameCategoryBox
              gameCategory={gameCategories[0]}
              currentTab={currentTab}
              changeTab={handleTabClick}
            />
          </div>
        )}

        {currentTab === "Virtual" && (
          <div ref={sectionRefs["Virtual"]}>
            <GameCategoryBox
              gameCategory={gameCategories[1]}
              currentTab={currentTab}
              changeTab={handleTabClick}
            />
          </div>
        )}

        {currentTab === "Jilli" && (
          <div ref={sectionRefs["Jilli"]}>
            <GameCategoryBox
              gameCategory={gameCategories[2]}
              currentTab={currentTab}
              changeTab={handleTabClick}
            />
          </div>
        )}

        {currentTab === "Slots" && (
          <div ref={sectionRefs["Slots"]}>
            <GameCategoryBox
              gameCategory={gameCategories[3]}
              currentTab={currentTab}
              changeTab={handleTabClick}
            />
          </div>
        )}

        {currentTab !== "Popular" && (
          <div className="flex justify-center items-center w-full my-">
            <Button
              variant="outlined"
              startIcon={<SportsEsports />}
              component={Link}
              to="/games"
              sx={{ borderRadius: "50px", paddingInline: "50px" }}
            >
              All Games
            </Button>
          </div>
        )}

        <WinningInfoBox />
        <TermsBox />
      </div>

      <BottomNavigationBox />

      {isConfirmationModalOpen &&  <ConfirmPopup onClick={handleClose} />}
    </div>
  );
};

export default Home;
