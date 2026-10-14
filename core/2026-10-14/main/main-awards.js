// RGBY · main-awards.jsx.txt · сборка 2026-10-14
var MainAwardsOld = props => React.createElement(window.MainAwardsV1, props);
function MainAwards({
  variant,
  setVariant
}) {
  if (!["ink", "paper"].includes(variant)) return React.createElement(MainAwardsOld, {
    variant: variant,
    setVariant: setVariant
  });
  return React.createElement(AwardsBlock, {
    tone: variant,
    label: "07 \u041D\u0430\u0433\u0440\u0430\u0434\u044B",
    switcher: React.createElement(VariantSwitch, {
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