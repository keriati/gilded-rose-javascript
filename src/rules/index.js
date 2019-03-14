import conjured from './conjured';
import backstagePass from './backstagePass';
import common from './common';
import cheese from './cheese';
import legendary from './legendary';


const rules = {
  [conjured.name]: conjured.rule,
  [backstagePass.name]: backstagePass.rule,
  [common.name]: common.rule,
  [cheese.name]: cheese.rule,
  [legendary.name]: legendary.rule,
};


export function getRuleAction(ruleActionName, itemName) {
  const rule = rules[itemName] || {};

  return rule[ruleActionName] || rules[common.name][ruleActionName];
}

export default function getActions(itemName) {
  const isSpoiled = getRuleAction('isSpoiled', itemName);
  const updateQuality = getRuleAction('updateQuality', itemName);
  const updateQualitySpoiled = getRuleAction('updateQualitySpoiled', itemName);

  return {
    updateQuality(item) {
      if (isSpoiled(item)) {
        return updateQualitySpoiled(item);
      }

      return updateQuality(item);
    },

    updateSellIn: getRuleAction('updateSellIn', itemName),
  };
}
