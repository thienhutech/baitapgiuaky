class khachHang
{
    constructor(fullname, caovoi, taytrang, chuphinh, tram){
        this.fullname = fullname;
        this.caovoi = caovoi;
        this.taytrang = taytrang;
        this.chuphinh = chuphinh;
        this.tram = tram;
    }
}

var eFullname = document.getElementById("edtTen");
var eCaoVoi = document.getElementById("cbCaoVoi");
var eTayTrang = document.getElementById("cbTayTrang");
var eChupHinh = document.getElementById("cbChupHinh");
var eTram = document.getElementById("edtTram");
var eTien = document.getElementById("txtTien");
var eList = document.getElementById("listKH");
function tinhTien()
{
    var fullname = eFullname.value;
    var cbCaoVoi = eCaoVoi.checked;
    var cbTayTrang = eTayTrang.checked;
    var cbChupHinh = eChupHinh.checked;
    var edtTram = eTram.value;

    if(fullname.length < 1){
        alert("Vui lòng nhập tên khách hàng");
        return;
    }

    var dichVu = cbCaoVoi == true || cbTayTrang == true || cbChupHinh == true || edtTram > 0;

    if(!dichVu)
    {
        alert("Vui lòng chọn ít nhất 1 dịch vụ để thanh toán");
        return;
    }
    if(edtTram < 0)
    {
        alert("Số lượng trám vui lòng lớn hơn hoặc bằng 0");
        return;
    }

    eTien.innerText = formatMoney(cal());
    saveInfo();

}

function cal(){
    var cbCaoVoi = eCaoVoi.checked;
    var cbTayTrang = eTayTrang.checked;
    var cbChupHinh = eChupHinh.checked;
    var edtTram = eTram.value;

    var tongTien = 0;

    if(cbCaoVoi) tongTien += 100000;
    if(cbTayTrang) tongTien += 1200000;
    if(cbChupHinh) tongTien += 200000;

    tongTien += edtTram*80000;
    return tongTien;

}


function reset()
{
   if(!confirm("Bạn có muốn xoá các thông tin bên trên?")) return;
   eFullname.value = "";
   eTram.value = 0;
   eCaoVoi.checked = false;
   eTayTrang.checked = false;
   eChupHinh.checked = false;
   eTien.innerText = 0;
}

function loadInfo()
{
    var fullname = localStorage.getItem("fullname");
    var cbCaoVoi = localStorage.getItem("cbCaoVoi");
    var cbTayTrang = localStorage.getItem("cbTayTrang");
    var cbChupHinh = localStorage.getItem("cbChupHinh");
    var edtTram = localStorage.getItem("edtTram");

    eFullname.value = fullname;
    eTram.value = edtTram;
    eCaoVoi.checked = cbCaoVoi == 'true';
    eTayTrang.checked = cbTayTrang == 'true';
    eChupHinh.checked = cbChupHinh == 'true';
    eTien.innerText = formatMoney(cal());

}

function saveInfo()
{
    localStorage.setItem("fullname",eFullname.value);
    localStorage.setItem("cbCaoVoi",eCaoVoi.checked);
    localStorage.setItem("cbTayTrang",eTayTrang.checked);
    localStorage.setItem("cbChupHinh",eChupHinh.checked);
    localStorage.setItem("edtTram",eTram.value);
}

function formatMoney(money)
{
    money = money.toString();
    if(money.length < 1 ) return 0;
    var newMoney = "";
    var count = 1;
    for(var i = money.length - 1; i >= 0; i--){
        if(count % 3 == 0 && i != 0) newMoney = "." + money[i]+ newMoney;
        else newMoney = money[i] + newMoney;
        count++;
    }
    return newMoney;
}