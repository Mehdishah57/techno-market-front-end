function formatDate(str) {
    let date = new Date(str);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  
export default formatDate;