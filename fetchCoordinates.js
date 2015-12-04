
function fetchCoordinates(obj) {
    var $isY, $isX, $isWidth, $isHeight;
    var $offset = obj.offset();
    $isY = $offset.top;
    $isX = $offset.left;
    $isWidth = $thisMsgBoxId.offsetWidth;
    $isHeight = $thisMsgBoxId.offsetHeight;

    var $mouseX = 0;
    var $mouseY = 0;
    $(document).mousemove(function (e) {
        $mouseX = e.pageX;
        $mouseY = e.pageY;
    });
    if (($mouseX > $isX && $mouseX < $isX + $isWidth) && ($mouseY > $isY && $mouseY < $isY + $isHeight)) {
        alert("hovered");
    };
};
var $isInside = fetchCoordinates($thisMsgBox);






