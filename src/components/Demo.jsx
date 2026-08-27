import { useMemo, useState } from 'react'
import {
  Beef,
  Rabbit,
  Dog,
  Sprout,
  Leaf,
  Droplets,
  Fish,
  Star,
  Calculator,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  Scale,
  MessageCircle,
  Languages,
  Pencil,
  Save,
  Lightbulb,
  Users,
  AlertTriangle
} from 'lucide-react'

/*
|--------------------------------------------------------------------------
| BALANCE BORA FARMER FEED FORMULATOR
|--------------------------------------------------------------------------
| Farmer-focused version
| - English / Kiswahili
| - Editable local prices
| - WhatsApp sharing
| - Simple explanations
| - Mobile friendly
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| TRANSLATIONS
|--------------------------------------------------------------------------
*/

const translations = {
  en: {
    demo: 'Farmer Feed Formulator',
    title: 'Make a better feed plan for your animals',
    subtitle:
      'Choose your animal, select feeds available on your farm, enter your local prices and get a simple ration estimate.',
    selectAnimal: '1. Choose your animal',
    chooseAnimalHelp: 'Tell us which animal you are feeding.',
    selectFeeds: '2. Choose feeds you have',
    selectFeedsHelp:
      'Select ingredients that are available or affordable near your farm.',
    prices: 'Local feed prices',
    pricesHelp:
      'Enter the price you pay locally. Prices are starting estimates and may differ by area.',
    budget: '3. Set your budget',
    animals: 'Number of animals',
    dailyBudget: 'Daily feed budget',
    next: 'Continue',
    back: 'Back',
    formulate: 'Make my ration',
    optimizing: 'Preparing your ration...',
    result: 'Your feed plan',
    totalCost: 'Estimated daily cost',
    costAnimal: 'Cost per animal',
    dryMatter: 'Feed dry matter',
    crudeProtein: 'Protein',
    energy: 'Energy',
    underBudget: 'under budget',
    overBudget: 'over budget',
    why: 'Why this ration?',
    share: 'Share on WhatsApp',
    editPrices: 'Edit prices',
    savePrices: 'Save prices',
    reset: 'Start again',
    selected: 'selected',
    atLeastThree: 'Please select at least 3 ingredients.',
    enterAnimals: 'Enter number of animals',
    language: 'Language',
    localPrice: 'Your price',
    perKg: 'per kg',
    ingredient: 'Ingredient',
    amount: 'Amount',
    cost: 'Cost',
    simpleWarning:
      'This is a planning estimate. Confirm feed quality and animal requirements with a qualified livestock nutritionist.',
    sourceNote:
      'Starting prices are Kenyan market estimates. Update them with the price you actually pay.',
    explanation:
      'The ration gives more weight to feeds that provide useful nutrients at a lower cost while trying to meet the animal requirement.',
    kg: 'kg',
    perDay: '/day',
    milk: 'Milk production',
    litres: 'litres/day',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    priceSaved: 'Prices saved',
    priceReset: 'Prices reset',
    languageEnglish: 'English',
    languageSwahili: 'Kiswahili'
  },

  sw: {
    demo: 'Kikokotoo cha Chakula cha Mkulima',
    title: 'Tengeneza mpango bora wa chakula cha mifugo',
    subtitle:
      'Chagua mnyama, chagua vyakula ulivyo navyo, weka bei zako na pata makadirio ya chakula.',
    selectAnimal: '1. Chagua mnyama',
    chooseAnimalHelp: 'Tuambie ni mnyama gani unataka kumlisha.',
    selectFeeds: '2. Chagua vyakula ulivyo navyo',
    selectFeedsHelp:
      'Chagua malighafi zinazopatikana au zinazoweza kununuliwa karibu na shamba lako.',
    prices: 'Bei za chakula katika eneo lako',
    pricesHelp:
      'Weka bei unayolipa. Bei zilizoonyeshwa ni makadirio ya kuanzia na zinaweza kutofautiana.',
    budget: '3. Weka bajeti yako',
    animals: 'Idadi ya wanyama',
    dailyBudget: 'Bajeti ya chakula kwa siku',
    next: 'Endelea',
    back: 'Rudi',
    formulate: 'Tengeneza chakula changu',
    optimizing: 'Tunaandaa chakula chako...',
    result: 'Mpango wako wa chakula',
    totalCost: 'Gharama ya makadirio kwa siku',
    costAnimal: 'Gharama kwa mnyama',
    dryMatter: 'Kiasi cha chakula kikavu',
    crudeProtein: 'Protini',
    energy: 'Nishati',
    underBudget: 'chini ya bajeti',
    overBudget: 'juu ya bajeti',
    why: 'Kwa nini chakula hiki?',
    share: 'Tuma WhatsApp',
    editPrices: 'Badilisha bei',
    savePrices: 'Hifadhi bei',
    reset: 'Anza tena',
    selected: 'imechaguliwa',
    atLeastThree: 'Tafadhali chagua angalau vyakula 3.',
    enterAnimals: 'Weka idadi ya wanyama',
    language: 'Lugha',
    localPrice: 'Bei yako',
    perKg: 'kwa kilo',
    ingredient: 'Chakula',
    amount: 'Kiasi',
    cost: 'Gharama',
    simpleWarning:
      'Haya ni makadirio ya kupanga chakula. Hakikisha ubora wa malighafi na mahitaji ya mnyama pamoja na mtaalamu wa lishe ya mifugo.',
    sourceNote:
      'Bei za kuanzia ni makadirio ya soko la Kenya. Zibadilishe kulingana na bei unayolipa.',
    explanation:
      'Mpango huu unapendelea vyakula vinavyotoa virutubisho muhimu kwa gharama ndogo huku ukilenga kukidhi mahitaji ya mnyama.',
    kg: 'kg',
    perDay: '/siku',
    milk: 'Uzalishaji wa maziwa',
    litres: 'lita/siku',
    low: 'Chini',
    medium: 'Kati',
    high: 'Juu',
    priceSaved: 'Bei zimehifadhiwa',
    priceReset: 'Bei zimerudishwa',
    languageEnglish: 'English',
    languageSwahili: 'Kiswahili'
  }
}

/*
|--------------------------------------------------------------------------
| ANIMALS
|--------------------------------------------------------------------------
*/

const animals = [
  {
    id: 'dairy-cow',
    name: 'Dairy Cow',
    swName: 'Ng’ombe wa Maziwa',
    icon: Beef,
    desc: 'Lactating cow',
    swDesc: 'Ng’ombe anayetoa maziwa',
    stage: 'Early Lactation',
    swStage: 'Mwanzo wa kutoa maziwa',

    /*
     * These are planning targets for the demo.
     * A production system should later use body weight,
     * milk yield, physiological stage and breed.
     */
    dm: 18,
    cp: 16,
    energy: 2.8,
    milk: 20
  },

  {
    id: 'goat',
    name: 'Dairy Goat',
    swName: 'Mbuzi wa Maziwa',
    icon: Rabbit,
    desc: 'Lactating goat',
    swDesc: 'Mbuzi anayetoa maziwa',
    stage: 'Mid Lactation',
    swStage: 'Katikati ya kutoa maziwa',

    dm: 3.5,
    cp: 14,
    energy: 2.6,
    milk: 3
  },

  {
    id: 'sheep',
    name: 'Meat Sheep',
    swName: 'Kondoo wa Nyama',
    icon: Dog,
    desc: 'Growing sheep',
    swDesc: 'Kondoo anayekua',
    stage: 'Finishing',
    swStage: 'Hatua ya mwisho ya ukuaji',

    dm: 2,
    cp: 13,
    energy: 2.4,
    milk: 0
  }
]

/*
|--------------------------------------------------------------------------
| STARTING KENYAN PRICES
|--------------------------------------------------------------------------
|
| These are deliberately editable.
|
| Examples checked against current Kenyan sources include:
| - wheat bran around KSh 22/kg
| - sunflower meal around KSh 28/kg
| - fishmeal around KSh 60/kg
| - maize germ around KSh 22/kg
| - soya around KSh 50/kg from a 70 kg / KSh 3,500 listing
| - dairy meal around KSh 40/kg from a 70 kg / KSh 2,800 listing
|
| Actual local prices should be entered by the farmer.
|--------------------------------------------------------------------------
*/

const initialFeeds = [
  {
    id: 'maize',
    name: 'Maize grain',
    swName: 'Mahindi',
    type: 'Energy',
    swType: 'Nishati',
    price: 25,
    dm: 88,
    cp: 9,
    energy: 3.3,
    icon: Sprout
  },

  {
    id: 'napier',
    name: 'Napier grass',
    swName: 'Nyasi ya Napier',
    type: 'Forage',
    swType: 'Malisho',
    price: 8,
    dm: 18,
    cp: 10,
    energy: 1.8,
    icon: Leaf
  },

  {
    id: 'maize-silage',
    name: 'Maize silage',
    swName: 'Silaji ya mahindi',
    type: 'Forage',
    swType: 'Malisho',
    price: 12,
    dm: 30,
    cp: 8,
    energy: 2.0,
    icon: Sprout
  },

  {
    id: 'dairy-meal',
    name: 'Dairy meal',
    swName: 'Dairy meal',
    type: 'Concentrate',
    swType: 'Chakula cha ziada',
    price: 40,
    dm: 88,
    cp: 18,
    energy: 3.2,
    icon: Star
  },

  {
    id: 'sunflower',
    name: 'Sunflower cake',
    swName: 'Mashudu ya alizeti',
    type: 'Protein',
    swType: 'Protini',
    price: 28,
    dm: 90,
    cp: 32,
    energy: 2.5,
    icon: Star
  },

  {
    id: 'wheat-bran',
    name: 'Wheat bran',
    swName: 'Pumba ya ngano',
    type: 'Concentrate',
    swType: 'Chakula cha ziada',
    price: 22,
    dm: 89,
    cp: 15,
    energy: 2.6,
    icon: Sprout
  },

  {
    id: 'fish-meal',
    name: 'Fish meal',
    swName: 'Unga wa samaki',
    type: 'Protein',
    swType: 'Protini',
    price: 60,
    dm: 92,
    cp: 55,
    energy: 3.8,
    icon: Fish
  },

  {
    id: 'molasses',
    name: 'Molasses',
    swName: 'Molasi',
    type: 'Energy',
    swType: 'Nishati',
    price: 20,
    dm: 75,
    cp: 4,
    energy: 2.9,
    icon: Droplets
  },

  {
    id: 'soybean',
    name: 'Soybean meal',
    swName: 'Mashudu ya soya',
    type: 'Protein',
    swType: 'Protini',
    price: 50,
    dm: 90,
    cp: 44,
    energy: 3.0,
    icon: Star
  },

  {
    id: 'lucerne',
    name: 'Lucerne hay',
    swName: 'Nyasi kavu ya Lucerne',
    type: 'Forage',
    swType: 'Malisho',
    price: 25,
    dm: 90,
    cp: 18,
    energy: 1.9,
    icon: Leaf
  }
]

/*
|--------------------------------------------------------------------------
| HELPER
|--------------------------------------------------------------------------
*/

const round = (number, decimals = 1) => {
  const factor = 10 ** decimals
  return Math.round(number * factor) / factor
}

/*
|--------------------------------------------------------------------------
| COMPONENT
|--------------------------------------------------------------------------
*/

export default function Demo() {
  const [language, setLanguage] = useState('sw')
  const t = translations[language]

  const [step, setStep] = useState(1)

  const [selectedAnimal, setSelectedAnimal] = useState(null)

  const [selectedFeeds, setSelectedFeeds] = useState([])

  const [feeds, setFeeds] = useState(initialFeeds)

  const [budget, setBudget] = useState(200)

  const [animalCount, setAnimalCount] = useState(1)

  const [result, setResult] = useState(null)

  const [formulating, setFormulating] = useState(false)

  const [editingPrices, setEditingPrices] = useState(false)

  /*
   |--------------------------------------------------------------------------
   | SELECTED ANIMAL
   |--------------------------------------------------------------------------
   */

  const selectedAnimalData = useMemo(
    () => animals.find((a) => a.id === selectedAnimal),
    [selectedAnimal]
  )

  /*
   |--------------------------------------------------------------------------
   | TOGGLE FEED
   |--------------------------------------------------------------------------
   */

  const toggleFeed = (feedId) => {
    setSelectedFeeds((prev) =>
      prev.includes(feedId)
        ? prev.filter((id) => id !== feedId)
        : [...prev, feedId]
    )
  }

  /*
   |--------------------------------------------------------------------------
   | PRICE UPDATE
   |--------------------------------------------------------------------------
   */

  const updatePrice = (feedId, price) => {
    setFeeds((prev) =>
      prev.map((feed) =>
        feed.id === feedId
          ? {
              ...feed,
              price:
                price === ''
                  ? ''
                  : Math.max(0, Number(price))
            }
          : feed
      )
    )
  }

  /*
   |--------------------------------------------------------------------------
   | SAVE PRICES
   |--------------------------------------------------------------------------
   */

  const savePrices = () => {
    try {
      localStorage.setItem(
        'balance-bora-feed-prices',
        JSON.stringify(feeds)
      )
    } catch (error) {
      console.log('Could not save prices', error)
    }

    setEditingPrices(false)
  }

  /*
   |--------------------------------------------------------------------------
   | RESET PRICES
   |--------------------------------------------------------------------------
   */

  const resetPrices = () => {
    setFeeds(initialFeeds)

    try {
      localStorage.removeItem('balance-bora-feed-prices')
    } catch (error) {
      console.log('Could not reset prices', error)
    }
  }

  /*
   |--------------------------------------------------------------------------
   | LOAD SAVED PRICES
   |--------------------------------------------------------------------------
   */

  useMemo(() => {
    try {
      const saved = localStorage.getItem(
        'balance-bora-feed-prices'
      )

      if (saved) {
        const parsed = JSON.parse(saved)

        if (Array.isArray(parsed)) {
          setFeeds(parsed)
        }
      }
    } catch (error) {
      console.log('Could not load saved prices', error)
    }

    return null
  }, [])

  /*
   |--------------------------------------------------------------------------
   | FORMULATION
   |--------------------------------------------------------------------------
   |
   | This is a demonstration formulation engine.
   |
   | A production version should eventually use:
   | - body weight
   | - milk yield
   | - breed
   | - age
   | - physiological stage
   | - actual feed analysis
   | - fibre
   | - minerals
   | - amino acids
   | - NDF/ADF
   | - formulation constraints
   |--------------------------------------------------------------------------
   */

  const handleFormulate = () => {
    if (!selectedAnimalData || selectedFeeds.length < 3) return

    setFormulating(true)

    setTimeout(() => {
      const req = selectedAnimalData

      const chosenFeeds = feeds
        .filter((feed) => selectedFeeds.includes(feed.id))
        .filter((feed) => Number(feed.price) > 0)

      /*
       * Rank feeds by approximate nutrient value per shilling.
       */
      const rankedFeeds = [...chosenFeeds].sort((a, b) => {
        const aValue = (a.energy * 0.55 + a.cp * 0.45) / Number(a.price)
        const bValue = (b.energy * 0.55 + b.cp * 0.45) / Number(b.price)

        return bValue - aValue
      })

      /*
       * Build a simple ration.
       *
       * We use dry matter as the main denominator.
       */
      let remainingDM = req.dm

      const ration = []

      let totalCost = 0
      let totalDM = 0
      let totalCP = 0
      let totalEnergy = 0

      rankedFeeds.forEach((feed, index) => {
        if (remainingDM <= 0) return

        /*
         * Give every selected feed a reasonable maximum.
         * This prevents one cheap ingredient from taking over
         * the entire ration.
         */
        let share

        if (index === 0) {
          share = 0.35
        } else if (index === 1) {
          share = 0.30
        } else if (index === 2) {
          share = 0.20
        } else {
          share = 0.15
        }

        const targetDM = Math.min(
          remainingDM,
          req.dm * share
        )

        /*
         * Convert DM to as-fed kg.
         */
        const asFedKg =
          targetDM / (Number(feed.dm) / 100)

        const cost =
          asFedKg * Number(feed.price)

        const cpKg =
          targetDM * (Number(feed.cp) / 100)

        const energy =
          targetDM * Number(feed.energy)

        ration.push({
          ...feed,
          dmKg: round(targetDM),
          amount: round(asFedKg),
          cost: round(cost),
          percentage: round(
            (targetDM / req.dm) * 100,
            0
          )
        })

        totalDM += targetDM
        totalCost += cost
        totalCP += cpKg
        totalEnergy += energy

        remainingDM -= targetDM
      })

      const cpPct =
        totalDM > 0
          ? (totalCP / totalDM) * 100
          : 0

      const energyDensity =
        totalDM > 0
          ? totalEnergy / totalDM
          : 0

      /*
       * Expand from one animal to the whole herd.
       */
      const herdCost =
        totalCost * animalCount

      const herdBudget =
        budget * animalCount

      const savings =
        herdBudget - herdCost

      /*
       * Generate simple explanation.
       */
      const cheapestProtein = [...ration]
        .filter((x) => x.cp >= 18)
        .sort((a, b) => a.cost - b.cost)[0]

      const cheapestEnergy = [...ration]
        .filter((x) => x.energy >= 2.5)
        .sort((a, b) => a.cost - b.cost)[0]

      let explanation = t.explanation

      if (cheapestProtein && cheapestEnergy) {
        if (language === 'sw') {
          explanation =
            `Mpango umetumia ${cheapestProtein.swName} kama chanzo muhimu cha protini na ${cheapestEnergy.swName} kama chanzo cha nishati. Mfumo umezingatia pia gharama ya kila malighafi ili kupunguza gharama ya chakula.`
        } else {
          explanation =
            `The plan uses ${cheapestProtein.name} as an important protein source and ${cheapestEnergy.name} as an energy source. The calculation also considers ingredient cost to help reduce feed expenses.`
        }
      }

      setResult({
        ration,
        totalCost: round(totalCost),
        herdCost: round(herdCost),
        totalDM: round(totalDM),
        totalCP: round(totalCP),
        totalEnergy: round(totalEnergy),
        cpPct: round(cpPct),
        energyDensity: round(energyDensity),
        req,
        savings: round(savings),
        explanation
      })

      setFormulating(false)

      setStep(4)
    }, 1200)
  }

  /*
   |--------------------------------------------------------------------------
   | WHATSAPP
   |--------------------------------------------------------------------------
   */

  const shareWhatsApp = () => {
    if (!result) return

    const animalName =
      language === 'sw'
        ? selectedAnimalData.swName
        : selectedAnimalData.name

    let message = ''

    if (language === 'sw') {
      message =
        `*BALANCE BORA – MPANGO WA CHAKULA*\n\n` +
        `Mnyama: ${animalName}\n` +
        `Idadi: ${animalCount}\n\n` +
        `*Malighafi:*\n`

      result.ration.forEach((item) => {
        message +=
          `• ${item.swName}: ${item.amount} kg = KSh ${item.cost}\n`
      })

      message +=
        `\n*Gharama kwa mnyama:* KSh ${result.totalCost}/siku\n` +
        `*Gharama ya wanyama wote:* KSh ${result.herdCost}/siku\n` +
        `*Protini:* ${result.cpPct}%\n` +
        `*Nishati:* ${result.energyDensity}\n\n` +
        `Kwa nini: ${result.explanation}\n\n` +
        `Imetengenezwa kwa Balance Bora.`
    } else {
      message =
        `*BALANCE BORA – FEED PLAN*\n\n` +
        `Animal: ${animalName}\n` +
        `Number: ${animalCount}\n\n` +
        `*Ingredients:*\n`

      result.ration.forEach((item) => {
        message +=
          `• ${item.name}: ${item.amount} kg = KSh ${item.cost}\n`
      })

      message +=
        `\n*Cost per animal:* KSh ${result.totalCost}/day\n` +
        `*Total herd cost:* KSh ${result.herdCost}/day\n` +
        `*Protein:* ${result.cpPct}%\n` +
        `*Energy:* ${result.energyDensity}\n\n` +
        `Why: ${result.explanation}\n\n` +
        `Prepared using Balance Bora.`
    }

    const url =
      `https://wa.me/?text=${encodeURIComponent(message)}`

    window.open(url, '_blank')
  }

  /*
   |--------------------------------------------------------------------------
   | RESET
   |--------------------------------------------------------------------------
   */

  const reset = () => {
    setStep(1)
    setSelectedAnimal(null)
    setSelectedFeeds([])
    setBudget(200)
    setAnimalCount(1)
    setResult(null)
  }

  /*
   |--------------------------------------------------------------------------
   | PROGRESS
   |--------------------------------------------------------------------------
   */

  const progressSteps =
    language === 'sw'
      ? ['Mnyama', 'Vyakula', 'Bajeti', 'Matokeo']
      : ['Animal', 'Feeds', 'Budget', 'Result']

  /*
   |--------------------------------------------------------------------------
   | RENDER
   |--------------------------------------------------------------------------
   */

  return (
    <section
      id="demo"
      className="py-12 sm:py-20 lg:py-24 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* -------------------------------------------------------------- */}
        {/* HEADER                                                         */}
        {/* -------------------------------------------------------------- */}

        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">

          <div className="flex justify-center mb-5">
            <button
              onClick={() =>
                setLanguage(
                  language === 'sw' ? 'en' : 'sw'
                )
              }
              className="inline-flex items-center gap-2 px-4 py-2 bg-bora-50 text-bora-800 rounded-full font-semibold text-sm border border-bora-100"
            >
              <Languages className="w-4 h-4" />

              {language === 'sw'
                ? 'English'
                : 'Kiswahili'}
            </button>
          </div>

          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-bora-100 text-bora-800 rounded-full text-sm font-semibold mb-4">
            <Calculator className="w-4 h-4" />
            {t.demo}
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-earth-900 mb-4">
            {t.title}
          </h2>

          <p className="text-earth-600 text-base sm:text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* PROGRESS                                                       */}
        {/* -------------------------------------------------------------- */}

        <div className="max-w-3xl mx-auto mb-10">

          <div className="grid grid-cols-4 gap-1 sm:gap-3">

            {progressSteps.map((label, index) => {
              const s = index + 1

              return (
                <div
                  key={label}
                  className="text-center"
                >
                  <div
                    className={`mx-auto w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-sm ${
                      step >= s
                        ? 'bg-bora-600 text-white'
                        : 'bg-earth-100 text-earth-400'
                    }`}
                  >
                    {step > s ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      s
                    )}
                  </div>

                  <p className="text-[11px] sm:text-xs mt-2 text-earth-500">
                    {label}
                  </p>
                </div>
              )
            })}

          </div>

        </div>

        {/* ==============================================================
            STEP 1
        ============================================================== */}

        {step === 1 && (
          <div>

            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-earth-900">
                {t.selectAnimal}
              </h3>

              <p className="text-earth-500 mt-2">
                {t.chooseAnimalHelp}
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">

              {animals.map((animal) => {

                const Icon = animal.icon

                const isSelected =
                  selectedAnimal === animal.id

                return (
                  <button
                    key={animal.id}
                    onClick={() =>
                      setSelectedAnimal(animal.id)
                    }
                    className={`relative p-5 sm:p-6 rounded-2xl border-2 text-left transition-all active:scale-[0.98] ${
                      isSelected
                        ? 'border-bora-600 bg-bora-50 shadow-md'
                        : 'border-earth-100 bg-white hover:border-bora-200'
                    }`}
                  >

                    {isSelected && (
                      <div className="absolute top-4 right-4">
                        <CheckCircle2 className="w-6 h-6 text-bora-600" />
                      </div>
                    )}

                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                        isSelected
                          ? 'bg-bora-600'
                          : 'bg-earth-100'
                      }`}
                    >
                      <Icon
                        className={`w-7 h-7 ${
                          isSelected
                            ? 'text-white'
                            : 'text-earth-500'
                        }`}
                      />
                    </div>

                    <h4 className="text-lg font-bold text-earth-900">
                      {language === 'sw'
                        ? animal.swName
                        : animal.name}
                    </h4>

                    <p className="text-sm text-earth-500 mt-1">
                      {language === 'sw'
                        ? animal.swDesc
                        : animal.desc}
                    </p>

                    <span className="inline-block mt-3 px-3 py-1 bg-earth-100 text-earth-600 rounded-full text-xs">
                      {language === 'sw'
                        ? animal.swStage
                        : animal.stage}
                    </span>

                  </button>
                )
              })}

            </div>

            <div className="flex justify-end mt-8">

              <button
                onClick={() =>
                  selectedAnimal && setStep(2)
                }
                disabled={!selectedAnimal}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-7 py-4 bg-bora-600 text-white font-semibold rounded-full hover:bg-bora-700 disabled:opacity-50"
              >
                {t.next}
                <ArrowRight className="w-5 h-5" />
              </button>

            </div>

          </div>
        )}

        {/* ==============================================================
            STEP 2
        ============================================================== */}

        {step === 2 && (
          <div>

            <div className="text-center mb-8">

              <h3 className="text-xl sm:text-2xl font-bold text-earth-900">
                {t.selectFeeds}
              </h3>

              <p className="text-earth-500 mt-2">
                {t.selectFeedsHelp}
              </p>

            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">

              {feeds.map((feed) => {

                const Icon = feed.icon

                const isSelected =
                  selectedFeeds.includes(feed.id)

                return (
                  <button
                    key={feed.id}
                    onClick={() =>
                      toggleFeed(feed.id)
                    }
                    className={`relative p-4 rounded-xl border-2 text-left transition-all active:scale-[0.98] ${
                      isSelected
                        ? 'border-bora-600 bg-bora-50'
                        : 'border-earth-100 bg-white'
                    }`}
                  >

                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="w-5 h-5 text-bora-600" />
                      </div>
                    )}

                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                        isSelected
                          ? 'bg-bora-600'
                          : 'bg-earth-100'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isSelected
                            ? 'text-white'
                            : 'text-earth-500'
                        }`}
                      />
                    </div>

                    <h4 className="font-semibold text-earth-900 text-sm">
                      {language === 'sw'
                        ? feed.swName
                        : feed.name}
                    </h4>

                    <p className="text-xs text-earth-500 mt-1">
                      {language === 'sw'
                        ? feed.swType
                        : feed.type}
                    </p>

                    <p className="mt-2 font-bold text-bora-700 text-sm">
                      KSh {feed.price}
                      <span className="font-normal text-earth-400">
                        /kg
                      </span>
                    </p>

                  </button>
                )
              })}

            </div>

            {/* PRICE EDITOR */}

            <div className="mt-8 bg-earth-50 rounded-2xl p-5 sm:p-6">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                <div>
                  <h4 className="font-bold text-earth-900">
                    {t.prices}
                  </h4>

                  <p className="text-sm text-earth-500 mt-1">
                    {t.pricesHelp}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setEditingPrices(!editingPrices)
                  }
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white border border-earth-200 rounded-full font-semibold text-earth-700"
                >
                  <Pencil className="w-4 h-4" />
                  {t.editPrices}
                </button>

              </div>

              {editingPrices && (
                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

                  {feeds.map((feed) => (

                    <div
                      key={feed.id}
                      className="bg-white rounded-xl p-4 border border-earth-100"
                    >

                      <label className="block text-sm font-semibold text-earth-800 mb-2">
                        {language === 'sw'
                          ? feed.swName
                          : feed.name}
                      </label>

                      <div className="flex items-center gap-2">

                        <span className="text-earth-500">
                          KSh
                        </span>

                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={feed.price}
                          onChange={(e) =>
                            updatePrice(
                              feed.id,
                              e.target.value
                            )
                          }
                          className="w-full border border-earth-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bora-500"
                        />

                        <span className="text-xs text-earth-400 whitespace-nowrap">
                          /kg
                        </span>

                      </div>

                    </div>

                  ))}

                  <div className="sm:col-span-2 lg:col-span-3 flex flex-col sm:flex-row gap-3">

                    <button
                      onClick={savePrices}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-bora-600 text-white rounded-full font-semibold"
                    >
                      <Save className="w-4 h-4" />
                      {t.savePrices}
                    </button>

                    <button
                      onClick={resetPrices}
                      className="px-5 py-3 text-earth-600 font-semibold"
                    >
                      Reset prices
                    </button>

                  </div>

                </div>
              )}

            </div>

            <p className="text-xs text-earth-400 mt-4 text-center">
              {t.sourceNote}
            </p>

            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">

              <button
                onClick={() => setStep(1)}
                className="inline-flex justify-center items-center gap-2 px-6 py-3 text-earth-600 font-semibold"
              >
                <ArrowLeft className="w-5 h-5" />
                {t.back}
              </button>

              <button
                onClick={() =>
                  selectedFeeds.length >= 3 &&
                  setStep(3)
                }
                disabled={selectedFeeds.length < 3}
                className="inline-flex justify-center items-center gap-2 px-7 py-4 bg-bora-600 text-white font-semibold rounded-full disabled:opacity-50"
              >
                {t.next}
                <ArrowRight className="w-5 h-5" />
              </button>

            </div>

            {selectedFeeds.length < 3 && (
              <p className="text-center text-sm text-red-500 mt-3">
                {t.atLeastThree}
              </p>
            )}

          </div>
        )}

        {/* ==============================================================
            STEP 3
        ============================================================== */}

        {step === 3 && selectedAnimalData && (
          <div className="max-w-xl mx-auto">

            <div className="text-center mb-8">

              <h3 className="text-xl sm:text-2xl font-bold text-earth-900">
                {t.budget}
              </h3>

              <p className="text-earth-500 mt-2">
                {selectedAnimalData.name}
              </p>

            </div>

            {/* ANIMAL COUNT */}

            <div className="bg-earth-50 rounded-2xl p-6 mb-5">

              <label className="block font-semibold text-earth-800 mb-3">
                <Users className="w-5 h-5 inline mr-2" />
                {t.animals}
              </label>

              <input
                type="number"
                min="1"
                max="1000"
                value={animalCount}
                onChange={(e) =>
                  setAnimalCount(
                    Math.max(
                      1,
                      Number(e.target.value) || 1
                    )
                  )
                }
                className="w-full text-2xl font-bold border border-earth-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-bora-500"
              />

            </div>

            {/* BUDGET */}

            <div className="bg-earth-50 rounded-2xl p-6 mb-6">

              <div className="flex items-center justify-between mb-4">

                <span className="text-earth-600 font-medium">
                  {t.dailyBudget}
                </span>

                <span className="text-3xl font-bold text-bora-700">
                  KSh {budget}
                </span>

              </div>

              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={budget}
                onChange={(e) =>
                  setBudget(Number(e.target.value))
                }
                className="w-full h-3 rounded-full appearance-none cursor-pointer accent-bora-600"
              />

              <div className="flex justify-between mt-2 text-xs text-earth-400">
                <span>KSh 50</span>
                <span>KSh 1,000</span>
              </div>

            </div>

            {/* SUMMARY */}

            <div className="bg-bora-50 rounded-2xl p-6 mb-6">

              <h4 className="font-bold text-earth-900 mb-4">
                {language === 'sw'
                  ? 'Muhtasari'
                  : 'Summary'}
              </h4>

              <div className="space-y-3 text-sm">

                <div className="flex justify-between">
                  <span className="text-earth-600">
                    {language === 'sw'
                      ? 'Mnyama'
                      : 'Animal'}
                  </span>

                  <strong>
                    {language === 'sw'
                      ? selectedAnimalData.swName
                      : selectedAnimalData.name}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-earth-600">
                    {t.animals}
                  </span>

                  <strong>{animalCount}</strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-earth-600">
                    {language === 'sw'
                      ? 'Vyakula'
                      : 'Ingredients'}
                  </span>

                  <strong>
                    {selectedFeeds.length}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-earth-600">
                    {t.dailyBudget}
                  </span>

                  <strong className="text-bora-700">
                    KSh {budget}
                  </strong>
                </div>

              </div>

            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">

              <button
                onClick={() => setStep(2)}
                className="inline-flex justify-center items-center gap-2 px-6 py-3 text-earth-600 font-semibold"
              >
                <ArrowLeft className="w-5 h-5" />
                {t.back}
              </button>

              <button
                onClick={handleFormulate}
                disabled={formulating}
                className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-bora-600 text-white font-bold rounded-full shadow-lg disabled:opacity-60"
              >

                {formulating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    {t.optimizing}
                  </>
                ) : (
                  <>
                    <Calculator className="w-5 h-5" />
                    {t.formulate}
                  </>
                )}

              </button>

            </div>

          </div>
        )}

        {/* ==============================================================
            STEP 4
        ============================================================== */}

        {step === 4 && result && selectedAnimalData && (
          <div>

            <div className="text-center mb-8">

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-bora-100 text-bora-800 rounded-full text-sm font-semibold mb-4">
                <CheckCircle2 className="w-4 h-4" />
                {language === 'sw'
                  ? 'Mpango umekamilika'
                  : 'Plan ready'}
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-earth-900">
                {t.result}
              </h3>

              <p className="text-earth-500 mt-2">
                {language === 'sw'
                  ? selectedAnimalData.swName
                  : selectedAnimalData.name}{' '}
                × {animalCount}
              </p>

            </div>

            {/* RESULTS CARDS */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">

              <div className="bg-earth-50 rounded-xl p-4 sm:p-5 text-center">

                <p className="text-xs text-earth-500 mb-1">
                  {t.totalCost}
                </p>

                <p className="text-xl sm:text-2xl font-bold text-earth-900">
                  KSh {result.herdCost}
                </p>

                <p className="text-xs text-earth-400 mt-1">
                  {animalCount} {t.perDay}
                </p>

              </div>

              <div className="bg-earth-50 rounded-xl p-4 sm:p-5 text-center">

                <p className="text-xs text-earth-500 mb-1">
                  {t.costAnimal}
                </p>

                <p className="text-xl sm:text-2xl font-bold text-earth-900">
                  KSh {result.totalCost}
                </p>

                <p className="text-xs text-earth-400 mt-1">
                  {t.perDay}
                </p>

              </div>

              <div className="bg-earth-50 rounded-xl p-4 sm:p-5 text-center">

                <p className="text-xs text-earth-500 mb-1">
                  {t.crudeProtein}
                </p>

                <p className="text-xl sm:text-2xl font-bold text-earth-900">
                  {result.cpPct}%
                </p>

                <p className="text-xs text-earth-400 mt-1">
                  {language === 'sw'
                    ? `Lengo ${result.req.cp}%`
                    : `Target ${result.req.cp}%`}
                </p>

              </div>

              <div className="bg-earth-50 rounded-xl p-4 sm:p-5 text-center">

                <p className="text-xs text-earth-500 mb-1">
                  {t.energy}
                </p>

                <p className="text-xl sm:text-2xl font-bold text-earth-900">
                  {result.energyDensity}
                </p>

                <p className="text-xs text-earth-400 mt-1">
                  {language === 'sw'
                    ? `Lengo ${result.req.energy}`
                    : `Target ${result.req.energy}`}
                </p>

              </div>

            </div>

            {/* BUDGET STATUS */}

            <div
              className={`rounded-xl p-5 mb-6 ${
                result.savings >= 0
                  ? 'bg-bora-50'
                  : 'bg-red-50'
              }`}
            >

              <div className="flex items-center gap-3">

                {result.savings >= 0 ? (
                  <TrendingDown className="w-6 h-6 text-bora-600" />
                ) : (
                  <TrendingUp className="w-6 h-6 text-red-500" />
                )}

                <div>

                  <p className="font-bold text-earth-900">
                    {result.savings >= 0
                      ? `KSh ${result.savings} ${t.underBudget}`
                      : `KSh ${Math.abs(
                          result.savings
                        )} ${t.overBudget}`}
                  </p>

                  <p className="text-sm text-earth-500">
                    {language === 'sw'
                      ? 'Ikilinganishwa na bajeti uliyochagua.'
                      : 'Compared with the budget you selected.'}
                  </p>

                </div>

              </div>

            </div>

            {/* RATION TABLE */}

            <div className="bg-white rounded-2xl border border-earth-200 overflow-hidden mb-6">

              <div className="px-5 sm:px-6 py-4 bg-earth-50 border-b border-earth-100">

                <h4 className="font-bold text-earth-900">
                  {language === 'sw'
                    ? 'Mchanganyiko wa chakula'
                    : 'Feed composition'}
                </h4>

              </div>

              <div className="divide-y divide-earth-100">

                {result.ration.map((item) => {

                  const Icon = item.icon

                  return (
                    <div
                      key={item.id}
                      className="px-4 sm:px-6 py-4"
                    >

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-lg bg-bora-50 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-bora-600" />
                        </div>

                        <div className="flex-1 min-w-0">

                          <p className="font-semibold text-earth-900">
                            {language === 'sw'
                              ? item.swName
                              : item.name}
                          </p>

                          <p className="text-xs text-earth-500">
                            {item.percentage}% {language === 'sw'
                              ? 'ya mchanganyiko'
                              : 'of ration'}
                          </p>

                        </div>

                        <div className="text-right">

                          <p className="font-bold text-earth-900">
                            {item.amount} kg
                          </p>

                          <p className="text-xs text-bora-700 font-semibold">
                            KSh {item.cost}
                          </p>

                        </div>

                      </div>

                    </div>
                  )
                })}

              </div>

              <div className="px-5 sm:px-6 py-4 bg-earth-50 border-t border-earth-100 flex justify-between">

                <span className="font-bold text-earth-900">
                  {t.costAnimal}
                </span>

                <span className="text-xl font-bold text-bora-700">
                  KSh {result.totalCost}
                </span>

              </div>

            </div>

            {/* WHY */}

            <div className="bg-bora-50 rounded-2xl p-5 sm:p-6 mb-6">

              <div className="flex items-start gap-3">

                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0">

                  <Lightbulb className="w-5 h-5 text-bora-600" />

                </div>

                <div>

                  <h4 className="font-bold text-earth-900 mb-2">
                    {t.why}
                  </h4>

                  <p className="text-sm sm:text-base text-earth-700 leading-relaxed">
                    {result.explanation}
                  </p>

                </div>

              </div>

            </div>

            {/* WARNING */}

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-8">

              <div className="flex gap-3">

                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />

                <p className="text-xs sm:text-sm text-amber-800">
                  {t.simpleWarning}
                </p>

              </div>

            </div>

            {/* ACTIONS */}

            <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">

              <button
                onClick={shareWhatsApp}
                className="inline-flex justify-center items-center gap-2 px-6 py-4 bg-[#25D366] text-white font-bold rounded-full hover:opacity-90 transition"
              >
                <MessageCircle className="w-5 h-5" />
                {t.share}
              </button>

              <button
                onClick={reset}
                className="inline-flex justify-center items-center gap-2 px-6 py-4 bg-earth-900 text-white font-bold rounded-full hover:bg-earth-800"
              >
                <RefreshCw className="w-5 h-5" />
                {t.reset}
              </button>

            </div>

          </div>
        )}

      </div>
    </section>
  )
}
