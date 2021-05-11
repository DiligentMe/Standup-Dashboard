function doGet() {
  console.log('in first display')
  console.log (Session.getActiveUser().getEmail());
  return HtmlService.createTemplateFromFile('page').evaluate();
}
function include(filename) {
  Logger.log('in file name')
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}
/*function uuid() {
  var ss= SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheetByName("Datasheet");
  var getLastRow = dataSheet.getLastRow();
  var getLastColumn = dataSheet.getLastColumn();
  if(getLastRow > 1) {
    var uuid_array = dataSheet.getRange(2, 1, getLastRow - 1, getLastColumn).getValues();  
  }
  return (uuid_array) ;
}*/
// Function to validate user at login screen //
function validateuser(empid){
  var dataSheet =SpreadsheetApp.getActiveSpreadsheet().getSheetByName("EmpValidation");
  var yesno = 'no';
  if ( dataSheet.createTextFinder(empid).findNext() !== null ) {
  if (dataSheet.createTextFinder(empid).findNext().getRow() == dataSheet.createTextFinder(Session.getActiveUser().getEmail()).findNext().getRow()){
    if (dataSheet.createTextFinder(empid).findNext().getRow() > 1 && dataSheet.createTextFinder(empid).findNext().getColumn() ==3 ){
      yesno = 'yes'
    }
  }
  }
  return (yesno);
}
// *** Function end **// 

// Function to get sheet user data to show on the dashboard //
function getsheetdata(empid){
  var ss= SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheetByName("Datasheet");
  var getLastRow = dataSheet.getLastRow();
  var getLastColumn = dataSheet.getLastColumn();
  console.log(getLastColumn ,getLastRow);
  var f1 = dataSheet.createTextFinder("Emp Number").findNext();
  if ( f1 !== null ){
    if (f1.getRow() == 1){
      if (dataSheet.createTextFinder(empid).findNext().getColumn() == f1.getColumn()){
        var fcol = f1.getColumn()
        var frow = dataSheet.createTextFinder(empid).findNext().getRow()
      }
    }
  }
  if(getLastRow > 1) {
    var data_array = dataSheet.getRange(2, 1, getLastRow - 1, getLastColumn-1).getValues();  
  }
  var farray = data_array ;
  for ( var i = 0 ; i <= (getLastRow -2) ; i = i +1){
    for (  var j = 0 ; j <= (getLastColumn -2) ; j = j +1){
      farray[i][j] = data_array[i][j] 
      if (j == (getLastColumn -2) ){
        farray[i][j+1] = 'N '
        if ( i == (frow - 2)){
          farray[i][j+1] = 'Y'
        }
      }
    }
  }
//  console.log(data_array[frow - 2][fcol - 2]);
  console.log(data_array);
  return (data_array) ;
}

function addtosheet(parm) {
//  parm = [4, 1, "new data"];
  var r1 = parm[0] + 2;
  var c1 = parm[1] + 1;
  var t1 = parm[2];
//  console.log(parm[1]);
//  console.log(t1);
  var ss= SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheetByName("Datasheet");
  var cell = dataSheet.getRange(r1,c1,1,1);
  cell.setValue(t1); 
} 
// *** Function end **//
