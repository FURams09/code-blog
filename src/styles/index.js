export default {
  Header: {
    headerContainer: {
      position: `fixed`,
      width: `100%`,
      height: `200px`,
      border: `1px dashed black`,
      backgroundColor: `green`,
    },
    jumbotronText: {
      position: `absolute`,
      top: `40%`,
      left: `30%`,
      color: `blue`,
      zIndex: `1`,
    },
  },
  Grid: {
    //TODO: convert this to flexbox. More in line with what it is
    gridContainer: {
      display: 'grid',
      gridTemplateAreas: `
      ". aboutMe purpose login ."`,
      gridTemplateColumns: `1fr minmax(200px, 400p) minmax(200px, 400p) minmax(200px, 400p) 1fr`,
      gridTemplateRows: `minmax(300px, 600p)`,
      textAlign: `center`,
      paddingTop: `200px`,
      border: `1px dashed red`,
    },
    gridContentArea: {
      textAlign: `center`,
      border: `1px dashed red`,
    },
  },
  Form: {
    formGroup: {
      display: `block`,
      margin: `10px 0px`,
    },
    label: {
      padding: `12px 12px 12px 0`,
      width: `25%`,
    },
    input: {
      padding: `12px 20px`,
      width: `75%`,
    },
    button: {
      padding: '10px 20px',
    },
  },
};
