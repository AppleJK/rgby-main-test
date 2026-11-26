// RGBY · project/ui_kits/main/main-awards.jsx.txt
// RGBY главная — «Награды»: общий AwardsBlock (landing/sections-bottom) — правки данных/вёрстки там попадают на все страницы. Тон: ink — чёрный, paper — белый.
const MainAwardsOld = props => React.createElement(window.MainAwardsV1, props);
function MainAwards({
  variant,
  setVariant
}) {
  if (!["ink", "paper"].includes(variant)) return /*#__PURE__*/React.createElement(MainAwardsOld, {
    variant: variant,
    setVariant: setVariant
  });
  return /*#__PURE__*/React.createElement(AwardsBlock, {
    tone: variant,
    sectionNumber: "07",
    switcher: /*#__PURE__*/React.createElement(VariantSwitch, {
      label: "\u041D\u0430\u0433\u0440\u0430\u0434\u044B",
      value: variant,
      options: ["ink", "paper"],
      onChange: setVariant
    })
  });
}
Object.assign(window, {
  MainAwards
});
