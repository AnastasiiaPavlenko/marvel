import React, { useRef, useState, useEffect } from 'react';
import { toggleModal } from "../actions/index";
import { connect } from "react-redux";
import CloseButton from 'react-bootstrap/CloseButton';
import superagent from "superagent";
import Spinner from 'react-bootstrap/Spinner';
import "regenerator-runtime/runtime";

const Modal = ({ toggleModal, selectedCharacter }) => {
const wrapperRef = useRef(null);
const MARVEL_PUBLIC_API_KEY="c317f50b63408e3262b39148a75c962a"; // This should not be commmited to the repository but for the sake of you being able to run the app locally I left it here
const apiKey = `apikey=${MARVEL_PUBLIC_API_KEY}`;

const [ events, setEvents ] = useState([]);
const [ stories, setStories ] = useState([]);
const [ series, setSeries ] = useState([]);
const [ isDataLoading, setDataLoading ] = useState(true);

const closeModal = () => {
    toggleModal(false);
}

const getRequest = url => {
    return new Promise((resolve, reject) => {
      superagent
        .get(url)
        .end((err, result) => {
          err ? reject(err) : resolve(
            result.body.data.results
          )
        })
    })
}

useEffect(() => {
    const fetchOptions = () => {
            let fetchUrlEvents = selectedCharacter.events.collectionURI + "?" + apiKey;
            const resultEvents = getRequest(fetchUrlEvents);

            let fetchUrlStories = selectedCharacter.stories.collectionURI + "?" + apiKey;
            const resultStories = getRequest(fetchUrlStories);
            
            let fetchUrlSeries = selectedCharacter.series.collectionURI + "?" + apiKey;
            const resultSeries = getRequest(fetchUrlSeries);

            Promise.all([resultEvents, resultStories, resultSeries]).then((values) => {
                setEvents(values[0][0]);
                setStories(values[1][0]);
                setSeries(values[2]);
                setDataLoading(false);
            })
    }
    fetchOptions(); 
}, []);

function clickedOustide (ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            toggleModal(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
}
clickedOustide(wrapperRef);

const renderBlock = (field, data) => {
    if(data.available > 0) {
        if(field == 'events') {
            return (
                <div className={`modal-${field}`}>
                    <div className="modal-heading">{field}</div>
                    {events && 
                        <>
                            <div>{events.title}</div>
                            <div>{events.description}</div>
                        </>}
                </div>
            )
        }
        else if(field == 'stories') {
            return (
                <div className={`modal-${field}`}>
                    <div className="modal-heading">{field}</div>
                    {stories && 
                        <>
                            <div>{stories.title}</div>
                            <div>{stories.description ? stories.description : "No description."}</div>
                            
                        </>}
                </div>
            )
        }
        else if(field == 'series') {
            return (
                <div className={`modal-${field}`}>
                    <div className="modal-heading">{field}</div>
                    {series && 
                        <>
                            <div>{series.title}</div>
                            {series.slice(0,3).map((item, index) => {
                                return (
                                    <div className="series-wrp" key={item.id}>
                                        <div className="series-title">{item.title}</div>
                                        <div>{item.startYear} - {item.endYear}</div>
                                        <div>{item.description}</div>
                                    </div>
                                )
                            })}
                        </>}
                </div>
            )
        }
    } else {
        return (
            <div className={`modal-${field}`}>
                <div className="modal-heading">{field}</div>
                No data available.
            </div>
        )
    }
}

    return (
	<div className="modal-view" id="modal-view">
            {!isDataLoading ? 
            <div className="modal-view--content" ref={wrapperRef}>
                <div className="close" onClick={closeModal}><CloseButton /></div>
                <div className="modal-flex">
                    <div className="modal-column">
                        <div className="modal-img--wrp">
                            <img className="modal-img" src={`${selectedCharacter.thumbnail}.${selectedCharacter.thumbnail_ext}`} alt={`${selectedCharacter.name} picture`}/>
                        </div>
                    </div>
                    <div className="modal-column column-right">
                        <div className="modal-name">{selectedCharacter.name}</div>
                        <div className="modal-description">{selectedCharacter.description}</div>
                        {renderBlock("events", selectedCharacter.events)} 
                        {renderBlock("stories", selectedCharacter.stories)} 
                        {renderBlock("series", selectedCharacter.series)} 
                    </div>
                </div>
            </div> 
        : <div className="spinner-wrp"><Spinner className="spinner" animation="border" variant="light" /></div>}
	</div>
    )
}

export const mapDispatchToProps = dispatch => {
    return {
        toggleModal: (bool) => dispatch(toggleModal(bool)),
    }
};

export const mapStateToProps = state => {
    return {
        isModalOpen: state.isModalOpen,
        selectedCharacter: state.selectedCharacter,
        characters: state.characters,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal)