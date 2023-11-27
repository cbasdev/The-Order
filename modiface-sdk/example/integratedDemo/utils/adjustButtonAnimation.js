function expandAdjustButton(id) {
    document.getElementById(id).classList.add(`${id}-new-position`);
}

function expandAllAdjustButtons() {
    expandAdjustButton('adjust-collapse-cta');
    expandAdjustButton('adjust-left-eye-cta');
    expandAdjustButton('adjust-right-eye-cta');
    expandAdjustButton('adjust-lips-cta');
}

function collapseAdjustButton(id) {
    document.getElementById(id).classList.remove(`${id}-new-position`);
}

function collapseAllAdjustButtons() {
    collapseAdjustButton('adjust-collapse-cta');
    collapseAdjustButton('adjust-left-eye-cta');
    collapseAdjustButton('adjust-right-eye-cta');
    collapseAdjustButton('adjust-lips-cta');
}
