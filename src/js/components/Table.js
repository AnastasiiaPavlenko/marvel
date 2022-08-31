import * as React from 'react';
import { useEffect } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import getMarvelCharacters from "./FetchCharacters";
import { savePreparedData, toggleModal, setSelectedCharacter } from "../actions/index";
import { connect } from "react-redux";
import "regenerator-runtime/runtime";

const Table = ({ characters, savePreparedData, toggleModal, setSelectedCharacter }) =>  {

useEffect(() => {
    const fetchOptions = async () => {
        const marvelCharacters = await getMarvelCharacters();
        savePreparedData(marvelCharacters.characters)
    };
    fetchOptions();
  }, []);

const defaultMaterialTheme = createTheme();
let tableMaxHeight = window.innerHeight - 130 - 117;

const rowOnClick = (event, rowData) => {
    setSelectedCharacter(rowData);
    toggleModal(true);
}

        return(
            <>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
                <ThemeProvider theme={defaultMaterialTheme}>
                {characters && <MaterialTable
                        columns={[
                        { title: 'Name', field: 'name' },
                        { title: 'Image', field: 'thumbnail', render: item => <img src={`${item.thumbnail}.${item.thumbnail_ext}`} alt="" border="3" height="100" width="100" /> },
                        { title: 'Description', field: 'description' },
                        ]}
                        data={characters}
                        title="Characters"
                        options={{
                            paging:true,
                            pageSize:10,
                            emptyRowsWhenPaging: false,
                            pageSizeOptions:[10,15,20],
                            sorting: true,
                            maxBodyHeight: `${tableMaxHeight}px`,
                            headerStyle: {
                                backgroundColor: '#e62429',
                                color: '#FFF'
                            },
                          }}
                        onRowClick={(event, rowData) => {rowOnClick(event, rowData)}} 
                    />}
                </ThemeProvider>
            </>
        );
}

export const mapDispatchToProps = dispatch => {
    return {
        savePreparedData: (data) => dispatch(savePreparedData(data)),
        toggleModal: (bool) => dispatch(toggleModal(bool)),
        setSelectedCharacter: (selected) => dispatch(setSelectedCharacter(selected)),
    }
};

export const mapStateToProps = state => {
    return {
        isModalOpen: state.isModalOpen,
        characters: state.characters,
        selectedCharacter: state.selectedCharacter,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Table)