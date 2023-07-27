import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Modal } from "react-bootstrap";

import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";

import styles from "./Home.module.css";

import {
  getBeers,
  FilterByType,
  getType,
  OrderByAlcohol,
} from "../../redux/actions";

import { xImg } from "../../images/images.js";

const Home = () => {
  //---------- States ----------//

  const beers = useSelector((state) => state.beers);
  const beerTypes = useSelector((state) => state.beerType);
  const [selectedType, setSelectedType] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [isLoading2, setIsLoading2] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const currentBeers = beers;

  const dispatch = useDispatch();

  //---------- Loader ----------//

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getBeers()).then(() => {
        setIsLoading(false);
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [dispatch]);

  //---------- Dispatches ----------//

  useEffect(() => {
    dispatch(getBeers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getType());
  }, [dispatch]);

  //---------- Send Handle ----------//

  const handleSend = () => {
    if (selectedType) {
      dispatch(FilterByType(selectedType));
    }

    if (selectedOrder) {
      dispatch(OrderByAlcohol(selectedOrder));
    }

    setShowModal(false);
  };

  //---------- Clear Handle ----------//

  const handleClear = () => {
    handleClearType();
    setSelectedOrder("");
    dispatch(OrderByAlcohol("clear"));

    setShowModal(false);
  };

  const handleClearType = () => {
    setSelectedType("");

    dispatch(FilterByType("clear"));
  };

  const handleFilterType = (e) => {
    setSelectedType(e.target.value);
  };

  if (isLoading) {
    return (
      <div>
        <span
          className={styles.loader}
          style={{ backgroundColor: "#ebcaca", width: "100%", height: "100%" }}
        ></span>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {/* Content Section */}

      <div>
        <div>
          <div>
            <a onClick={() => setShowModal(true)} style={{ cursor: "pointer" }}>
              <button className={styles.btnPrimary}>Filter</button>
            </a>
          </div>

          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            dialogClassName="modal-xl"
            aria-labelledby="example-custom-modal-styling-title"
            style={{
              backgroundColor: "rgba(243, 240, 235, 0.3)",
            }}
          >
            <Modal.Body
              style={{
                backgroundColor: "#F3F0EB",
              }}
            >
              {/* Closing Buttom */}
              <div
                style={{
                  position: "sticky",
                  top: "0",
                  zIndex: "1",
                  padding: "0.5em",
                  backgroundColor: "#f3f0ea",
                  display: "flex",
                  justifyContent: "flex-end",

                  width: "100%",
                }}
              >
                <button
                  className={styles.Submmit3}
                  onClick={() => setShowModal(false)}
                >
                  <img src={xImg} alt="xImg" className={styles.imageSide2} />
                </button>
              </div>
              <div
                className={styles.box}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <select
                  className={styles["style-dropdown"]}
                  onChange={(e) => handleFilterType(e)}
                  value={selectedType}
                >
                  <option value="" disabled hidden>
                    Select type
                  </option>
                  {beerTypes &&
                    beerTypes
                      .sort((a, b) => {
                        if (a.type < b.type) return -1;
                        if (a.type > b.type) return 1;
                        return 0;
                      })
                      .map((typ) => {
                        return (
                          <option
                            value={typ.type}
                            key={typ.id}
                            disabled={typ.type === selectedType}
                          >
                            {typ.type}
                          </option>
                        );
                      })}
                </select>

                <select
                  className={styles["style-dropdown"]}
                  value={selectedOrder}
                  onChange={(e) => setSelectedOrder(e.target.value)}
                >
                  <option value="" disabled selected hidden>
                    Alcohol %
                  </option>
                  <option value="low">low </option>
                  <option value="high">high </option>
                </select>

                <button
                  className={`${styles.btnPrimary} ${
                    selectedType || selectedOrder ? "" : styles.disabled
                  }`}
                  onClick={handleSend}
                  disabled={!selectedType && !selectedOrder}
                >
                  Send
                </button>

                <button
                  className={`${styles.btnPrimary} ${
                    selectedType || selectedOrder ? "" : styles.disabled
                  }`}
                  onClick={handleClear}
                  disabled={!selectedType && !selectedOrder}
                >
                  Clear Type
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "2em",
                }}
              >
                {selectedOrder && (
                  <div>
                    <span className={styles.p1}>
                      Alcohol %: {selectedOrder}
                    </span>
                  </div>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "1em",
                }}
              >
                {selectedType && (
                  <div>
                    <span className={styles.p1}>Beer Type: {selectedType}</span>
                  </div>
                )}{" "}
              </div>
              <div
                className={styles.dividerSlider}
                style={{
                  paddingTop: "2em",
                }}
              ></div>
            </Modal.Body>
          </Modal>
        </div>

        <CardsContainer currentBeers={currentBeers} />
      </div>

      {isLoading2 && (
        <div>
          <span
            className={styles.loader}
            style={{
              backgroundColor: "#ebcaca",
              width: "100%",
              height: "100%",
            }}
          ></span>
        </div>
      )}
    </div>
  );
};

export default Home;
