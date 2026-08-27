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
  Circle,
  Calculator,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  Scale,
  Users,
  Wallet,
  Info,
  Languages,
  MessageCircle,
  Pencil,
  Plus,
  Trash2,
  Lightbulb,
  Milk,
} from 'lucide-react'

/*
  ============================================================
  BALANCE BORA - FARMER FEED FORMULATOR
  ============================================================

  This component is:
  - Mobile friendly
  - English / Kiswahili
  - Farmer-friendly
  - Editable feed prices
  - WhatsApp sharing
  - Simple "Why this feed?" explanation
  - Designed so a real formulation API can replace the
    demonstration formulation engine later.

  IMPORTANT:
  The current formulation engine is a DEMONSTRATION algorithm.
  It should not yet be presented as a scientifically validated
  least-cost ration.
*/

/* ============================================================
   ANIMALS
============================================================ */

const animals = [
  {
    id: 'dairy-cow',
    name: 'Dairy Cow',
    sw: 'Ng’ombe wa maziwa',
    icon: Beef,
    desc: 'Milk-producing cow',
    swDesc: 'Ng’ombe anayetoa maziwa',
    stages: ['Early lactation', 'Mid lactation', 'Late lactation'],
    swStages: ['Mwanzo wa kunyonyesha', 'Katikati ya kunyonyesha', 'Mwisho wa kunyonyesha'],
  },
  {
    id: 'goat',
    name: 'Dairy Goat',
    sw: 'Mbuzi wa maziwa',
    icon: Rabbit,
    desc: 'Milk-producing goat',
    swDesc: 'Mbuzi anayetoa maziwa',
    stages: ['Early lactation', 'Mid lactation', 'Late lactation'],
    swStages: ['Mwanzo wa kunyonyesha', 'Katikati ya kunyonyesha', 'Mwisho wa kunyonyesha'],
  },
  {
    id: 'sheep',
    name: 'Meat Sheep',
    sw: 'Kondoo wa nyama',
    icon: Dog,
    desc: 'Growing or finishing sheep',
    swDesc: 'Kondoo anayekua au kunenepeshwa',
    stages: ['Growing', 'Finishing', 'Maintenance'],
    swStages: ['Anayekua', 'Anayenepeshwa', 'Matunzo'],
  },
]

/* ============================================================
   FEEDS
   price = KES per kg
   dm = dry matter percentage
   cp = crude protein percentage
   energy = simplified energy value
============================================================ */

const defaultFeeds = [
  {
    id: 'napier',
    name: 'Napier Grass',
    sw: 'Nyasi za Napier',
    type: 'Forage',
    swType: 'Malisho ya kijani',
    price: 8,
    dm: 18,
    cp: 10,
    energy: 1.8,
    icon: Leaf,
  },
  {
    id: 'maize-silage',
    name: 'Maize Silage',
    sw: 'Silaji ya mahindi',
    type: 'Forage',
    swType: 'Malisho',
    price: 12,
    dm: 30,
    cp: 8,
    energy: 2.0,
    icon: Sprout,
  },
  {
    id: 'dairy-meal',
    name: 'Dairy Meal',
    sw: 'Dairy meal',
    type: 'Concentrate',
    swType: 'Mchanganyiko wa lishe',
    price: 45,
    dm: 88,
    cp: 18,
    energy: 3.2,
    icon: Circle,
  },
  {
    id: 'sunflower',
    name: 'Sunflower Cake',
    sw: 'Mashudu ya alizeti',
    type: 'Protein',
    swType: 'Chanzo cha protini',
    price: 35,
    dm: 90,
    cp: 32,
    energy: 2.5,
    icon: Star,
  },
  {
    id: 'wheat-bran',
    name: 'Wheat Bran',
    sw: 'Pumba za ngano',
    type: 'Concentrate',
    swType: 'Mchanganyiko wa lishe',
    price: 22,
    dm: 89,
    cp: 15,
    energy: 2.6,
    icon: Sprout,
  },
  {
    id: 'fish-meal',
    name: 'Fish Meal',
    sw: 'Unga wa samaki',
    type: 'Protein',
    swType: 'Chanzo cha protini',
    price: 85,
    dm: 92,
    cp: 55,
    energy: 3.8,
    icon: Fish,
  },
  {
    id: 'molasses',
    name: 'Molasses',
    sw: 'Molasi',
    type: 'Energy',
    swType: 'Chanzo cha nishati',
    price: 18,
    dm: 75,
    cp: 4,
    energy: 2.9,
    icon: Droplets,
  },
  {
    id: 'lucerne',
    name: 'Lucerne Hay',
    sw: 'Hay ya Lucerne',
    type: 'Forage',
    swType: 'Malisho makavu',
    price: 25,
    dm: 90,
    cp: 18,
    energy: 1.9,
    icon: Leaf,
  },
]

/* ============================================================
   BASIC REQUIREMENTS
============================================================ */

const requirements = {
  'dairy-cow': {
    dm: 18,
    cp: 16,
    energy: 2.8,
    name: 'Dairy Cow',
    sw: 'Ng’ombe wa maziwa',
    defaultWeight: 450,
    defaultMilk: 15,
  },

  goat: {
    dm: 3.5,
    cp: 14,
    energy: 2.6,
    name: 'Dairy Goat',
    sw: 'Mbuzi wa maziwa',
    defaultWeight: 45,
    defaultMilk: 3,
  },

  sheep: {
    dm: 2.0,
    cp: 13,
    energy: 2.4,
    name: 'Meat Sheep',
    sw: 'Kondoo wa nyama',
    defaultWeight: 30,
    defaultMilk: 0,
  },
}

/* ============================================================
   TRANSLATIONS
============================================================ */

const translations = {
  en: {
    calculator: 'Feed Calculator',
    title: 'Make a Better Feed Plan',
    subtitle:
      'Tell us about your animals and the feeds you have. We will estimate a practical daily feed plan and cost.',
    chooseAnimal: 'What animal are you feeding?',
    chooseAnimalHelp: 'Choose the animal you want to prepare feed for.',
    numberAnimals: 'How many animals do you have?',
    bodyWeight: 'Average body weight',
    milkProduction: 'Milk produced per day',
    productionStage: 'Production stage',
    next: 'Next',
    back: 'Back',
    feedsTitle: 'What feeds do you have?',
    feedsHelp: 'Select the ingredients that are available on your farm.',
    selected: 'Selected',
    price: 'Price',
    editPrices: 'Edit feed prices',
    hidePrices: 'Hide feed prices',
    priceHelp: 'Enter the price you normally pay for each ingredient.',
    perKg: '/kg',
    addFeed: 'Add another feed',
    feedName: 'Feed name',
    add: 'Add',
    cancel: 'Cancel',
    remove: 'Remove',
    budgetTitle: 'What is your feed budget?',
    budgetHelp: 'Set your approximate budget per animal per day.',
    perAnimalDay: 'per animal / day',
    summary: 'Your choices',
    animal: 'Animal',
    animals: 'Animals',
    ingredients: 'Ingredients',
    budget: 'Budget',
    makePlan: 'Make My Feed Plan',
    preparing: 'Preparing your feed plan...',
    planReady: 'Feed plan ready',
    dailyPlan: 'Your Daily Feed Plan',
    eachAnimal: 'For each animal',
    wholeHerd: 'For your whole herd',
    dailyCost: 'Daily cost',
    totalHerdCost: 'Total herd cost',
    protein: 'Protein',
    energy: 'Energy',
    dryMatter: 'Dry matter',
    nutritionCheck: 'Nutrition check',
    estimated: 'estimated',
    underBudget: 'under budget',
    overBudget: 'over budget',
    whyFeed: 'Why did Balance Bora choose these feeds?',
    explanation:
      'The plan gives priority to feeds that can provide the required nutrients while considering their price. Higher-protein ingredients help supply protein, while forage and energy feeds provide bulk and energy.',
    whatsapp: 'Share on WhatsApp',
    another: 'Make Another Feed Plan',
    demoNotice:
      'This is a demonstration estimate. Actual feed requirements depend on animal weight, production, breed, feed quality and other factors. Always confirm important feeding decisions with a qualified animal nutrition professional.',
    pricesSaved: 'Your feed prices are saved on this phone.',
    selectMinimum: 'Select at least 3 ingredients.',
    enterFeedName: 'Please enter a feed name.',
    enterPrice: 'Please enter a valid price.',
    kg: 'kg',
    litres: 'litres',
    day: 'day',
    perDay: 'per day',
    costPerAnimal: 'Cost / animal',
    totalCost: 'Total cost',
    savings: 'Budget difference',
    available: 'Available on your farm',
    edit: 'Edit',
  },

  sw: {
    calculator: 'Kikokotoo cha Chakula',
    title: 'Tengeneza Mpango Bora wa Chakula',
    subtitle:
      'Tuambie kuhusu mifugo yako na vyakula ulivyo navyo. Tutakusaidia kukadiria chakula cha kila siku na gharama.',
    chooseAnimal: 'Unalisha mnyama gani?',
    chooseAnimalHelp: 'Chagua mnyama ambaye unataka kumtengenezea chakula.',
    numberAnimals: 'Una wanyama wangapi?',
    bodyWeight: 'Uzito wa wastani',
    milkProduction: 'Maziwa kwa siku',
    productionStage: 'Hatua ya uzalishaji',
    next: 'Endelea',
    back: 'Rudi',
    feedsTitle: 'Una vyakula gani?',
    feedsHelp: 'Chagua vyakula vilivyo kwenye shamba lako.',
    selected: 'Imechaguliwa',
    price: 'Bei',
    editPrices: 'Badilisha bei za vyakula',
    hidePrices: 'Ficha bei',
    priceHelp: 'Weka bei unayolipa kwa kila chakula.',
    perKg: '/kg',
    addFeed: 'Ongeza chakula kingine',
    feedName: 'Jina la chakula',
    add: 'Ongeza',
    cancel: 'Ghairi',
    remove: 'Ondoa',
    budgetTitle: 'Bajeti yako ya chakula ni kiasi gani?',
    budgetHelp: 'Weka kiasi unachoweza kutumia kwa mnyama mmoja kwa siku.',
    perAnimalDay: 'kwa mnyama / siku',
    summary: 'Chaguo zako',
    animal: 'Mnyama',
    animals: 'Wanyama',
    ingredients: 'Vyakula',
    budget: 'Bajeti',
    makePlan: 'Tengeneza Mpango Wangu',
    preparing: 'Tunatengeneza mpango wako...',
    planReady: 'Mpango wa chakula uko tayari',
    dailyPlan: 'Mpango wa Chakula wa Kila Siku',
    eachAnimal: 'Kwa kila mnyama',
    wholeHerd: 'Kwa mifugo yote',
    dailyCost: 'Gharama ya siku',
    totalHerdCost: 'Gharama ya mifugo yote',
    protein: 'Protini',
    energy: 'Nishati',
    dryMatter: 'Kausha lishe',
    nutritionCheck: 'Ukaguzi wa lishe',
    estimated: 'makadirio',
    underBudget: 'chini ya bajeti',
    overBudget: 'juu ya bajeti',
    whyFeed: 'Kwa nini Balance Bora imechagua vyakula hivi?',
    explanation:
      'Mpango unazingatia virutubisho vinavyohitajika na gharama ya vyakula. Vyakula vyenye protini nyingi husaidia kuongeza protini, huku malisho na vyakula vya nishati vikisaidia kutoa kiasi na nishati.',
    whatsapp: 'Shiriki WhatsApp',
    another: 'Tengeneza Mpango Mwingine',
    demoNotice:
      'Haya ni makadirio ya majaribio. Mahitaji halisi hutegemea uzito wa mnyama, uzalishaji, aina ya mnyama, ubora wa chakula na mambo mengine. Kwa maamuzi muhimu ya lishe, shauriana na mtaalamu wa lishe ya mifugo.',
    pricesSaved: 'Bei zako zimehifadhiwa kwenye simu hii.',
    selectMinimum: 'Chagua angalau vyakula 3.',
    enterFeedName: 'Tafadhali weka jina la chakula.',
    enterPrice: 'Tafadhali weka bei sahihi.',
    kg: 'kg',
    litres: 'lita',
    day: 'siku',
    perDay: 'kwa siku',
    costPerAnimal: 'Gharama / mnyama',
    totalCost: 'Gharama yote',
    savings: 'Tofauti ya bajeti',
    available: 'Inapatikana shambani',
    edit: 'Badilisha',
  },
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function Demo() {
  const [language, setLanguage] = useState('en')

  const t = translations[language]

  const [step, setStep] = useState(1)

  const [selectedAnimal, setSelectedAnimal] = useState(null)

  const [numberOfAnimals, setNumberOfAnimals] = useState(1)

  const [bodyWeight, setBodyWeight] = useState(450)

  const [milkProduction, setMilkProduction] = useState(15)

  const [productionStage, setProductionStage] = useState(0)

  const [feeds, setFeeds] = useState(defaultFeeds)

  const [selectedFeeds, setSelectedFeeds] = useState([])

  const [editingPrices, setEditingPrices] = useState(false)

  const [budget, setBudget] = useState(200)

  const [result, setResult] = useState(null)

  const [formulating, setFormulating] = useState(false)

  const [showAddFeed, setShowAddFeed] = useState(false)

  const [newFeedName, setNewFeedName] = useState('')

  const [newFeedPrice, setNewFeedPrice] = useState('')

  /* ==========================================================
     CURRENT ANIMAL
  ========================================================== */

  const currentAnimal = useMemo(
    () => animals.find((animal) => animal.id === selectedAnimal),
    [selectedAnimal]
  )

  const currentRequirement = selectedAnimal
    ? requirements[selectedAnimal]
    : null

  /* ==========================================================
     LANGUAGE SWITCH
  ========================================================== */

  const switchLanguage = () => {
    setLanguage((previous) =>
      previous === 'en' ? 'sw' : 'en'
    )
  }

  /* ==========================================================
     ANIMAL SELECTION
  ========================================================== */

  const handleAnimalSelect = (animalId) => {
    setSelectedAnimal(animalId)

    const req = requirements[animalId]

    setBodyWeight(req.defaultWeight)

    setMilkProduction(req.defaultMilk)

    setProductionStage(0)

    const defaultAnimals =
      animalId === 'dairy-cow'
        ? 1
        : animalId === 'goat'
          ? 2
          : 3

    setNumberOfAnimals(defaultAnimals)
  }

  /* ==========================================================
     FEED SELECTION
  ========================================================== */

  const toggleFeed = (feedId) => {
    setSelectedFeeds((previous) =>
      previous.includes(feedId)
        ? previous.filter((id) => id !== feedId)
        : [...previous, feedId]
    )
  }

  /* ==========================================================
     PRICE CHANGE
  ========================================================== */

  const updateFeedPrice = (feedId, price) => {
    const numericPrice = Number(price)

    if (Number.isNaN(numericPrice)) return

    setFeeds((previous) =>
      previous.map((feed) =>
        feed.id === feedId
          ? {
              ...feed,
              price: numericPrice,
            }
          : feed
      )
    )
  }

  /* ==========================================================
     ADD CUSTOM FEED
  ========================================================== */

  const addCustomFeed = () => {
    const cleanName = newFeedName.trim()

    const numericPrice = Number(newFeedPrice)

    if (!cleanName) {
      window.alert(t.enterFeedName)
      return
    }

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      window.alert(t.enterPrice)
      return
    }

    const id = `custom-${Date.now()}`

    const customFeed = {
      id,
      name: cleanName,
      sw: cleanName,
      type: 'Other',
      swType: 'Nyingine',
      price: numericPrice,
      dm: 88,
      cp: 12,
      energy: 2.4,
      icon: Sprout,
      custom: true,
    }

    setFeeds((previous) => [
      ...previous,
      customFeed,
    ])

    setSelectedFeeds((previous) => [
      ...previous,
      id,
    ])

    setNewFeedName('')
    setNewFeedPrice('')
    setShowAddFeed(false)
  }

  /* ==========================================================
     REMOVE CUSTOM FEED
  ========================================================== */

  const removeCustomFeed = (feedId) => {
    setFeeds((previous) =>
      previous.filter((feed) => feed.id !== feedId)
    )

    setSelectedFeeds((previous) =>
      previous.filter((id) => id !== feedId)
    )
  }

  /* ==========================================================
     FORMULATION ENGINE
  ========================================================== */

  const handleFormulate = () => {
    if (!selectedAnimal || selectedFeeds.length < 3) {
      return
    }

    setFormulating(true)

    /*
      Small delay gives the farmer feedback that the system
      is working.
    */

    setTimeout(() => {
      const animalReq = requirements[selectedAnimal]

      const chosenFeeds = feeds.filter((feed) =>
        selectedFeeds.includes(feed.id)
      )

      /*
        Demonstration calculation.

        The real Balance Bora formulation engine should later
        replace this block with a proper least-cost optimization
        model using nutrient constraints.
      */

      let remainingDM = animalReq.dm

      let totalCost = 0
      let totalDM = 0
      let totalCP = 0
      let totalEnergy = 0

      const ration = []

      /*
        Give priority to feeds with a good energy/price ratio.
      */

      const sortedFeeds = [...chosenFeeds].sort(
        (a, b) =>
          b.energy / Math.max(b.price, 0.01) -
          a.energy / Math.max(a.price, 0.01)
      )

      /*
        Limit each selected ingredient to a reasonable share
        of the ration for this demonstration.
      */

      for (const feed of sortedFeeds) {
        if (remainingDM <= 0) break

        const amountDM = Math.min(
          remainingDM,
          animalReq.dm * 0.4
        )

        /*
          Convert dry matter to as-fed quantity.
        */

        const asFedKg =
          amountDM / Math.max(feed.dm / 100, 0.01)

        const cost =
          asFedKg * Math.max(feed.price, 0)

        ration.push({
          ...feed,

          dmAmount:
            Math.round(amountDM * 10) / 10,

          asFedAmount:
            Math.round(asFedKg * 10) / 10,

          cost:
            Math.round(cost * 10) / 10,

          percentage:
            Math.round(
              (amountDM / animalReq.dm) * 100
            ),
        })

        totalCost += cost

        totalDM += amountDM

        totalCP +=
          (amountDM * feed.cp) / 100

        totalEnergy +=
          amountDM * feed.energy

        remainingDM -= amountDM
      }

      const cpPct =
        totalDM > 0
          ? Math.round(
              (totalCP / totalDM) *
                100 *
                10
            ) / 10
          : 0

      const energyDensity =
        totalDM > 0
          ? Math.round(
              (totalEnergy / totalDM) *
                10
            ) / 10
          : 0

      const herdCost =
        totalCost * numberOfAnimals

      const herdBudget =
        budget * numberOfAnimals

      const savings =
        herdBudget - herdCost

      setResult({
        ration,

        totalCost:
          Math.round(totalCost * 10) / 10,

        totalHerdCost:
          Math.round(herdCost * 10) / 10,

        totalDM:
          Math.round(totalDM * 10) / 10,

        totalHerdDM:
          Math.round(
            totalDM *
              numberOfAnimals *
              10
          ) / 10,

        totalCP:
          Math.round(totalCP * 10) / 10,

        totalEnergy:
          Math.round(totalEnergy * 10) / 10,

        cpPct,

        energyDensity,

        savings:
          Math.round(savings * 10) / 10,

        costPerAnimal:
          Math.round(totalCost * 10) / 10,

        numberOfAnimals,

        req: animalReq,

        weight: bodyWeight,

        milk: milkProduction,
      })

      setFormulating(false)

      setStep(4)
    }, 1000)
  }

  /* ==========================================================
     WHATSAPP SHARING
  ========================================================== */

  const shareWhatsApp = () => {
    if (!result) return

    const animalName =
      language === 'sw'
        ? result.req.sw
        : result.req.name

    const rationText = result.ration
      .map((item) => {
        const name =
          language === 'sw'
            ? item.sw
            : item.name

        return `• ${name}: ${item.asFedAmount} kg`
      })
      .join('\n')

    const message =
      language === 'sw'
        ? `🐄 BALANCE BORA - MPANGO WA CHAKULA

Mnyama: ${animalName}
Idadi: ${result.numberOfAnimals}
Uzito wa wastani: ${result.weight} kg
Maziwa: ${result.milk} lita/siku

CHAKULA KWA KILA MNYAMA:
${rationText}

Gharama kwa mnyama: KES ${result.costPerAnimal}/siku
Gharama ya mifugo yote: KES ${result.totalHerdCost}/siku

Protini: ${result.cpPct}%

Huu ni mpango wa makadirio kutoka Balance Bora.`
        : `🐄 BALANCE BORA - FEED PLAN

Animal: ${animalName}
Number: ${result.numberOfAnimals}
Average weight: ${result.weight} kg
Milk: ${result.milk} litres/day

FEED PER ANIMAL:
${rationText}

Cost per animal: KES ${result.costPerAnimal}/day
Total herd cost: KES ${result.totalHerdCost}/day

Protein: ${result.cpPct}%

This is an estimated plan from Balance Bora.`

    const url =
      `https://wa.me/?text=${encodeURIComponent(message)}`

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  /* ==========================================================
     RESET
  ========================================================== */

  const reset = () => {
    setStep(1)
    setSelectedAnimal(null)
    setNumberOfAnimals(1)
    setBodyWeight(450)
    setMilkProduction(15)
    setProductionStage(0)
    setSelectedFeeds([])
    setBudget(200)
    setResult(null)
    setFormulating(false)
  }

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <section
      id="demo"
      className="py-12 sm:py-16 lg:py-24 bg-white"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">

          <div className="flex justify-center mb-4">

            <button
              type="button"
              onClick={switchLanguage}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-earth-100 text-earth-700 text-sm font-semibold hover:bg-earth-200 transition-colors"
            >
              <Languages className="w-4 h-4" />

              {language === 'en'
                ? 'Kiswahili'
                : 'English'}
            </button>

          </div>

          <span className="inline-flex items-center px-4 py-2 bg-bora-100 text-bora-800 rounded-full text-sm font-semibold mb-4">

            <Calculator className="w-4 h-4 mr-2" />

            {t.calculator}

          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-earth-900 mb-4">
            {t.title}
          </h2>

          <p className="text-earth-600 text-base sm:text-lg leading-relaxed">
            {t.subtitle}
          </p>

        </div>

        {/* ==================================================
            PROGRESS
        ================================================== */}

        <div className="flex items-center justify-center mb-8 sm:mb-12">

          {[1, 2, 3, 4].map((s) => (

            <div
              key={s}
              className="flex items-center"
            >

              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full flex items-center justify-center font-bold text-sm ${
                  step >= s
                    ? 'bg-bora-600 text-white shadow-lg'
                    : 'bg-earth-100 text-earth-400'
                }`}
              >

                {step > s ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  s
                )}

              </div>

              {s < 4 && (

                <div
                  className={`w-7 sm:w-12 h-0.5 mx-1 sm:mx-2 ${
                    step > s
                      ? 'bg-bora-600'
                      : 'bg-earth-200'
                  }`}
                />

              )}

            </div>

          ))}

        </div>

        {/* ==================================================
            STEP 1 - ANIMAL
        ================================================== */}

        {step === 1 && (

          <div>

            <h3 className="text-xl sm:text-2xl font-bold text-earth-900 text-center mb-2">
              {t.chooseAnimal}
            </h3>

            <p className="text-center text-earth-500 mb-8">
              {t.chooseAnimalHelp}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">

              {animals.map((animal) => {

                const Icon = animal.icon

                const selected =
                  selectedAnimal === animal.id

                return (

                  <button
                    key={animal.id}
                    type="button"
                    onClick={() =>
                      handleAnimalSelect(
                        animal.id
                      )
                    }
                    className={`relative p-5 sm:p-6 rounded-2xl border-2 text-left transition-all ${
                      selected
                        ? 'border-bora-600 bg-bora-50 shadow-md'
                        : 'border-earth-100 hover:border-bora-200 hover:shadow-md'
                    }`}
                  >

                    {selected && (

                      <div className="absolute top-3 right-3">
                        <CheckCircle2 className="w-6 h-6 text-bora-600" />
                      </div>

                    )}

                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                        selected
                          ? 'bg-bora-600'
                          : 'bg-earth-100'
                      }`}
                    >

                      <Icon
                        className={`w-7 h-7 ${
                          selected
                            ? 'text-white'
                            : 'text-earth-500'
                        }`}
                      />

                    </div>

                    <h4 className="text-lg font-bold text-earth-900">
                      {language === 'sw'
                        ? animal.sw
                        : animal.name}
                    </h4>

                    <p className="text-sm text-earth-500 mt-1">
                      {language === 'sw'
                        ? animal.swDesc
                        : animal.desc}
                    </p>

                  </button>

                )
              })}

            </div>

            {selectedAnimal && (

              <div className="mt-6 bg-earth-50 rounded-2xl p-5 sm:p-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* NUMBER */}

                  <div>

                    <label className="block text-sm font-semibold text-earth-800 mb-2">
                      {t.numberAnimals}
                    </label>

                    <div className="relative">

                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-bora-600" />

                      <input
                        type="number"
                        min="1"
                        max="1000"
                        value={numberOfAnimals}
                        onChange={(e) =>
                          setNumberOfAnimals(
                            Math.max(
                              1,
                              Number(
                                e.target.value
                              )
                            )
                          )
                        }
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-2 focus:ring-bora-500"
                      />

                    </div>

                  </div>

                  {/* WEIGHT */}

                  <div>

                    <label className="block text-sm font-semibold text-earth-800 mb-2">
                      {t.bodyWeight} ({t.kg})
                    </label>

                    <div className="relative">

                      <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-bora-600" />

                      <input
                        type="number"
                        min="1"
                        value={bodyWeight}
                        onChange={(e) =>
                          setBodyWeight(
                            Math.max(
                              1,
                              Number(
                                e.target.value
                              )
                            )
                          )
                        }
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-2 focus:ring-bora-500"
                      />

                    </div>

                  </div>

                  {/* MILK */}

                  {selectedAnimal !== 'sheep' && (

                    <div>

                      <label className="block text-sm font-semibold text-earth-800 mb-2">
                        {t.milkProduction} ({t.litres})
                      </label>

                      <div className="relative">

                        <Milk className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-bora-600" />

                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={milkProduction}
                          onChange={(e) =>
                            setMilkProduction(
                              Math.max(
                                0,
                                Number(
                                  e.target.value
                                )
                              )
                            )
                          }
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-2 focus:ring-bora-500"
                        />

                      </div>

                    </div>

                  )}

                  {/* STAGE */}

                  <div>

                    <label className="block text-sm font-semibold text-earth-800 mb-2">
                      {t.productionStage}
                    </label>

                    <select
                      value={productionStage}
                      onChange={(e) =>
                        setProductionStage(
                          Number(e.target.value)
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-white focus:outline-none focus:ring-2 focus:ring-bora-500"
                    >

                      {currentAnimal?.stages.map(
                        (stage, index) => (

                          <option
                            key={stage}
                            value={index}
                          >
                            {language === 'sw'
                              ? currentAnimal.swStages[index]
                              : stage}
                          </option>

                        )
                      )}

                    </select>

                  </div>

                </div>

              </div>

            )}

            <div className="flex justify-end mt-8">

              <button
                type="button"
                disabled={!selectedAnimal}
                onClick={() =>
                  selectedAnimal &&
                  setStep(2)
                }
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-7 py-3 bg-bora-600 text-white font-semibold rounded-full hover:bg-bora-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >

                {t.next}

                <ArrowRight className="w-5 h-5" />

              </button>

            </div>

          </div>

        )}

        {/* ==================================================
            STEP 2 - FEEDS
        ================================================== */}

        {step === 2 && (

          <div>

            <h3 className="text-xl sm:text-2xl font-bold text-earth-900 text-center mb-2">
              {t.feedsTitle}
            </h3>

            <p className="text-center text-earth-500 mb-8">
              {t.feedsHelp}
            </p>

            {/* PRICE EDITOR */}

            <div className="mb-5">

              <button
                type="button"
                onClick={() =>
                  setEditingPrices(
                    (previous) => !previous
                  )
                }
                className="w-full flex items-center justify-between p-4 rounded-xl bg-earth-50 hover:bg-earth-100 transition-colors"
              >

                <span className="flex items-center gap-2 font-semibold text-earth-800">

                  <Pencil className="w-4 h-4 text-bora-600" />

                  {editingPrices
                    ? t.hidePrices
                    : t.editPrices}

                </span>

                <span className="text-sm text-earth-500">
                  {editingPrices ? '−' : '+'}
                </span>

              </button>

              {editingPrices && (

                <div className="mt-3 bg-earth-50 rounded-xl p-4">

                  <p className="text-sm text-earth-500 mb-4">
                    {t.priceHelp}
                  </p>

                  <div className="space-y-3">

                    {feeds.map((feed) => (

                      <div
                        key={feed.id}
                        className="flex items-center gap-3"
                      >

                        <span className="text-sm text-earth-700 flex-1">
                          {language === 'sw'
                            ? feed.sw
                            : feed.name}
                        </span>

                        <div className="relative w-32">

                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-earth-400">
                            KES
                          </span>

                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={feed.price}
                            onChange={(e) =>
                              updateFeedPrice(
                                feed.id,
                                e.target.value
                              )
                            }
                            className="w-full pl-12 pr-2 py-2 rounded-lg border border-earth-200 bg-white text-sm"
                          />

                        </div>

                        <span className="text-xs text-earth-400">
                          {t.perKg}
                        </span>

                      </div>

                    ))}

                  </div>

                  <p className="flex items-center gap-2 text-xs text-bora-700 mt-4">
                    <CheckCircle2 className="w-4 h-4" />
                    {t.pricesSaved}
                  </p>

                </div>

              )}

            </div>

            {/* FEED CARDS */}

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

              {feeds.map((feed) => {

                const Icon = feed.icon

                const selected =
                  selectedFeeds.includes(feed.id)

                return (

                  <div
                    key={feed.id}
                    className={`relative rounded-xl border-2 transition-all ${
                      selected
                        ? 'border-bora-600 bg-bora-50'
                        : 'border-earth-100 bg-white'
                    }`}
                  >

                    <button
                      type="button"
                      onClick={() =>
                        toggleFeed(feed.id)
                      }
                      className="w-full p-4 text-left"
                    >

                      {selected && (

                        <div className="absolute top-2 right-2 w-6 h-6 bg-bora-600 rounded-full flex items-center justify-center">

                          <CheckCircle2 className="w-4 h-4 text-white" />

                        </div>

                      )}

                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                          selected
                            ? 'bg-bora-600'
                            : 'bg-earth-100'
                        }`}
                      >

                        <Icon
                          className={`w-5 h-5 ${
                            selected
                              ? 'text-white'
                              : 'text-earth-500'
                          }`}
                        />

                      </div>

                      <h4 className="font-semibold text-earth-900 text-sm pr-5">
                        {language === 'sw'
                          ? feed.sw
                          : feed.name}
                      </h4>

                      <p className="text-xs text-earth-500 mt-1">
                        {language === 'sw'
                          ? feed.swType
                          : feed.type}
                      </p>

                      <p className="text-sm font-bold text-bora-700 mt-2">
                        KES {feed.price}
                        <span className="font-normal text-xs text-earth-400">
                          {t.perKg}
                        </span>
                      </p>

                    </button>

                    {feed.custom && (

                      <button
                        type="button"
                        onClick={() =>
                          removeCustomFeed(
                            feed.id
                          )
                        }
                        className="absolute bottom-2 right-2 p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                        title={t.remove}
                      >

                        <Trash2 className="w-4 h-4" />

                      </button>

                    )}

                  </div>

                )
              })}

            </div>

            {/* ADD CUSTOM FEED */}

            <div className="mt-5">

              {!showAddFeed ? (

                <button
                  type="button"
                  onClick={() =>
                    setShowAddFeed(true)
                  }
                  className="inline-flex items-center gap-2 text-sm font-semibold text-bora-700 hover:text-bora-800"
                >

                  <Plus className="w-4 h-4" />

                  {t.addFeed}

                </button>

              ) : (

                <div className="bg-earth-50 rounded-xl p-4">

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                    <input
                      type="text"
                      value={newFeedName}
                      onChange={(e) =>
                        setNewFeedName(
                          e.target.value
                        )
                      }
                      placeholder={t.feedName}
                      className="px-4 py-3 rounded-xl border border-earth-200 bg-white"
                    />

                    <input
                      type="number"
                      min="0"
                      value={newFeedPrice}
                      onChange={(e) =>
                        setNewFeedPrice(
                          e.target.value
                        )
                      }
                      placeholder="KES/kg"
                      className="px-4 py-3 rounded-xl border border-earth-200 bg-white"
                    />

                    <div className="flex gap-2">

                      <button
                        type="button"
                        onClick={addCustomFeed}
                        className="flex-1 px-4 py-3 bg-bora-600 text-white rounded-xl font-semibold"
                      >
                        {t.add}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setShowAddFeed(false)
                        }
                        className="px-4 py-3 bg-earth-200 text-earth-700 rounded-xl"
                      >
                        {t.cancel}
                      </button>

                    </div>

                  </div>

                </div>

              )}

            </div>

            <div className="mt-5 flex items-start gap-2 text-sm text-earth-500 bg-earth-50 rounded-xl p-4">

              <Info className="w-4 h-4 shrink-0 mt-0.5 text-bora-600" />

              <p>
                {t.available}
                {': '}
                <strong>
                  {selectedFeeds.length}
                </strong>
              </p>

            </div>

            {/* NAVIGATION */}

            <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 mt-8">

              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex justify-center items-center gap-2 px-6 py-3 text-earth-600 font-semibold"
              >

                <ArrowLeft className="w-5 h-5" />

                {t.back}

              </button>

              <button
                type="button"
                disabled={
                  selectedFeeds.length < 3
                }
                onClick={() =>
                  selectedFeeds.length >= 3 &&
                  setStep(3)
                }
                className="inline-flex justify-center items-center gap-2 px-7 py-3 bg-bora-600 text-white font-semibold rounded-full disabled:opacity-50"
              >

                {t.next}

                <ArrowRight className="w-5 h-5" />

              </button>

            </div>

            {selectedFeeds.length < 3 && (

              <p className="text-center text-sm text-amber-600 mt-3">
                {t.selectMinimum}
              </p>

            )}

          </div>

        )}

        {/* ==================================================
            STEP 3 - BUDGET
        ================================================== */}

        {step === 3 && (

          <div className="max-w-xl mx-auto">

            <h3 className="text-xl sm:text-2xl font-bold text-earth-900 text-center mb-2">
              {t.budgetTitle}
            </h3>

            <p className="text-center text-earth-500 mb-8">
              {t.budgetHelp}
            </p>

            <div className="bg-earth-50 rounded-2xl p-5 sm:p-8 mb-6">

              <div className="flex items-center gap-3 mb-6">

                <Wallet className="w-7 h-7 text-bora-600" />

                <div>

                  <p className="text-sm text-earth-500">
                    {t.perAnimalDay}
                  </p>

                  <p className="text-3xl font-bold text-bora-700">
                    KES {budget}
                  </p>

                </div>

              </div>

              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={budget}
                onChange={(e) =>
                  setBudget(
                    Number(e.target.value)
                  )
                }
                className="w-full h-2 bg-earth-200 rounded-full appearance-none cursor-pointer accent-bora-600"
              />

              <div className="flex justify-between mt-2 text-sm text-earth-400">

                <span>KES 50</span>

                <span>KES 1,000</span>

              </div>

            </div>

            {/* SUMMARY */}

            <div className="bg-bora-50 rounded-xl p-5 mb-8">

              <h4 className="font-semibold text-earth-900 mb-4">
                {t.summary}
              </h4>

              <div className="space-y-3 text-sm">

                <div className="flex justify-between gap-4">

                  <span className="text-earth-600">
                    {t.animal}
                  </span>

                  <span className="font-semibold text-earth-900">
                    {language === 'sw'
                      ? currentRequirement?.sw
                      : currentRequirement?.name}
                  </span>

                </div>

                <div className="flex justify-between gap-4">

                  <span className="text-earth-600">
                    {t.animals}
                  </span>

                  <span className="font-semibold text-earth-900">
                    {numberOfAnimals}
                  </span>

                </div>

                <div className="flex justify-between gap-4">

                  <span className="text-earth-600">
                    {t.ingredients}
                  </span>

                  <span className="font-semibold text-earth-900">
                    {selectedFeeds.length}
                  </span>

                </div>

                <div className="flex justify-between gap-4">

                  <span className="text-earth-600">
                    {t.budget}
                  </span>

                  <span className="font-semibold text-bora-700">
                    KES {budget}
                  </span>

                </div>

              </div>

            </div>

            {/* NAVIGATION */}

            <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">

              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex justify-center items-center gap-2 px-6 py-3 text-earth-600 font-semibold"
              >

                <ArrowLeft className="w-5 h-5" />

                {t.back}

              </button>

              <button
                type="button"
                onClick={handleFormulate}
                disabled={formulating}
                className="inline-flex justify-center items-center gap-2 px-7 py-4 bg-bora-600 text-white font-bold rounded-full hover:bg-bora-700 disabled:opacity-60 shadow-lg"
              >

                {formulating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />

                    {t.preparing}
                  </>
                ) : (
                  <>
                    <Calculator className="w-5 h-5" />

                    {t.makePlan}
                  </>
                )}

              </button>

            </div>

          </div>

        )}

        {/* ==================================================
            STEP 4 - RESULTS
        ================================================== */}

        {step === 4 && result && (

          <div>

            {/* RESULT HEADER */}

            <div className="text-center mb-8">

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-bora-100 text-bora-800 rounded-full text-sm font-semibold mb-4">

                <CheckCircle2 className="w-4 h-4" />

                {t.planReady}

              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-earth-900">
                {t.dailyPlan}
              </h3>

              <p className="text-earth-500 mt-2">

                {result.numberOfAnimals}{' '}

                {language === 'sw'
                  ? result.req.sw
                  : result.req.name}

              </p>

            </div>

            {/* SUMMARY */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">

              <div className="bg-earth-50 rounded-xl p-4 sm:p-5 text-center">

                <p className="text-xs text-earth-500 mb-1">
                  {t.costPerAnimal}
                </p>

                <p className="text-xl sm:text-2xl font-bold text-earth-900">
                  KES {result.costPerAnimal}
                </p>

                <p className="text-xs text-earth-400 mt-1">
                  {t.perDay}
                </p>

              </div>

              <div className="bg-earth-50 rounded-xl p-4 sm:p-5 text-center">

                <p className="text-xs text-earth-500 mb-1">
                  {t.totalHerdCost}
                </p>

                <p className="text-xl sm:text-2xl font-bold text-earth-900">
                  KES {result.totalHerdCost}
                </p>

                <p className="text-xs text-earth-400 mt-1">
                  {t.perDay}
                </p>

              </div>

              <div className="bg-earth-50 rounded-xl p-4 sm:p-5 text-center">

                <p className="text-xs text-earth-500 mb-1">
                  {t.protein}
                </p>

                <p className="text-xl sm:text-2xl font-bold text-earth-900">
                  {result.cpPct}%
                </p>

                <p className="text-xs text-earth-400 mt-1">
                  {t.estimated}
                </p>

              </div>

              <div className="bg-earth-50 rounded-xl p-4 sm:p-5 text-center">

                <p className="text-xs text-earth-500 mb-1">
                  {t.savings}
                </p>

                <p
                  className={`text-xl sm:text-2xl font-bold ${
                    result.savings >= 0
                      ? 'text-bora-700'
                      : 'text-red-600'
                  }`}
                >
                  KES {Math.abs(result.savings)}
                </p>

                <p className="text-xs text-earth-400 mt-1 flex items-center justify-center gap-1">

                  {result.savings >= 0 ? (
                    <>
                      <TrendingDown className="w-3 h-3" />
                      {t.underBudget}
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-3 h-3" />
                      {t.overBudget}
                    </>
                  )}

                </p>

              </div>

            </div>

            {/* RATION */}

            <div className="bg-white rounded-2xl border border-earth-200 overflow-hidden mb-6">

              <div className="px-4 sm:px-6 py-4 bg-earth-50 border-b border-earth-100">

                <h4 className="font-bold text-earth-900">
                  {t.eachAnimal}
                </h4>

                <p className="text-xs text-earth-500 mt-1">
                  {language === 'sw'
                    ? 'Kiasi cha chakula kinachoonyeshwa ni makadirio ya chakula kama kinavyolishwa.'
                    : 'Quantities shown are estimated as-fed quantities.'}
                </p>

              </div>

              <div className="divide-y divide-earth-100">

                {result.ration.map((item) => {

                  const Icon = item.icon

                  const feedName =
                    language === 'sw'
                      ? item.sw
                      : item.name

                  return (

                    <div
                      key={item.id}
                      className="px-4 sm:px-6 py-4"
                    >

                      <div className="flex items-center justify-between gap-3">

                        <div className="flex items-center gap-3 min-w-0">

                          <div className="w-10 h-10 shrink-0 rounded-lg bg-bora-50 flex items-center justify-center">

                            <Icon className="w-5 h-5 text-bora-600" />

                          </div>

                          <div className="min-w-0">

                            <p className="font-semibold text-earth-900">
                              {feedName}
                            </p>

                            <p className="text-xs text-earth-500">
                              {language === 'sw'
                                ? item.swType
                                : item.type}
                            </p>

                          </div>

                        </div>

                        <div className="text-right shrink-0">

                          <p className="font-bold text-earth-900">
                            {item.asFedAmount} {t.kg}
                          </p>

                          <p className="text-xs text-earth-500">
                            KES {item.cost}
                          </p>

                        </div>

                      </div>

                    </div>

                  )
                })}

              </div>

              <div className="px-4 sm:px-6 py-4 bg-earth-50 border-t border-earth-100">

                <div className="flex justify-between items-center">

                  <span className="font-bold text-earth-900">
                    {t.dailyCost}
                  </span>

                  <span className="text-xl font-bold text-bora-700">
                    KES {result.totalCost}
                  </span>

                </div>

              </div>

            </div>

            {/* HERD SUMMARY */}

            <div className="bg-bora-50 rounded-xl p-5 sm:p-6 mb-6">

              <div className="flex items-start gap-3">

                <Users className="w-6 h-6 text-bora-600 shrink-0" />

                <div>

                  <h4 className="font-bold text-earth-900">
                    {t.wholeHerd}
                  </h4>

                  <p className="text-sm text-earth-600 mt-1">

                    {language === 'sw'
                      ? `Una ${result.numberOfAnimals} ${result.req.sw}. Gharama ya chakula inakadiriwa kuwa KES ${result.totalHerdCost} kwa siku.`
                      : `You have ${result.numberOfAnimals} ${result.req.name}${result.numberOfAnimals !== 1 ? 's' : ''}. Estimated feed cost is KES ${result.totalHerdCost} per day.`}

                  </p>

                </div>

              </div>

            </div>

            {/* WHY */}

            <div className="bg-white rounded-2xl border border-earth-200 p-5 sm:p-6 mb-6">

              <div className="flex items-start gap-3">

                <div className="w-10 h-10 rounded-xl bg-bora-100 flex items-center justify-center shrink-0">

                  <Lightbulb className="w-5 h-5 text-bora-700" />

                </div>

                <div>

                  <h4 className="font-bold text-earth-900 mb-2">
                    {t.whyFeed}
                  </h4>

                  <p className="text-sm text-earth-600 leading-relaxed">
                    {t.explanation}
                  </p>

                </div>

              </div>

            </div>

            {/* NUTRITION */}

            <div className="bg-white rounded-2xl border border-earth-200 p-5 sm:p-6 mb-6">

              <div className="flex items-center gap-2 mb-5">

                <Scale className="w-5 h-5 text-bora-600" />

                <h4 className="font-bold text-earth-900">
                  {t.nutritionCheck}
                </h4>

              </div>

              <div className="space-y-5">

                {[
                  {
                    label: t.dryMatter,
                    value:
                      (result.totalDM /
                        result.req.dm) *
                      100,
                  },

                  {
                    label: t.protein,
                    value:
                      (result.cpPct /
                        result.req.cp) *
                      100,
                  },

                  {
                    label: t.energy,
                    value:
                      (result.energyDensity /
                        result.req.energy) *
                      100,
                  },
                ].map((metric) => {

                  const value = Math.min(
                    Math.max(
                      metric.value,
                      0
                    ),
                    100
                  )

                  return (

                    <div key={metric.label}>

                      <div className="flex justify-between text-sm mb-2">

                        <span className="text-earth-700">
                          {metric.label}
                        </span>

                        <span
                          className={`font-semibold ${
                            value >= 90
                              ? 'text-bora-600'
                              : 'text-amber-600'
                          }`}
                        >
                          {Math.round(value)}%
                        </span>

                      </div>

                      <div className="h-2.5 bg-earth-200 rounded-full overflow-hidden">

                        <div
                          className={`h-full rounded-full transition-all ${
                            value >= 90
                              ? 'bg-bora-500'
                              : 'bg-amber-500'
                          }`}
                          style={{
                            width: `${value}%`,
                          }}
                        />

                      </div>

                    </div>

                  )
                })}

              </div>

            </div>

            {/* WHATSAPP */}

            <button
              type="button"
              onClick={shareWhatsApp}
              className="w-full mb-5 inline-flex justify-center items-center gap-2 px-6 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg"
            >

              <MessageCircle className="w-5 h-5" />

              {t.whatsapp}

            </button>

            {/* NOTICE */}

            <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4 mb-8">

              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />

              <p className="text-sm text-amber-800 leading-relaxed">
                {t.demoNotice}
              </p>

            </div>

            {/* RESET */}

            <div className="flex justify-center">

              <button
                type="button"
                onClick={reset}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-4 bg-earth-900 text-white font-bold rounded-full hover:bg-earth-800 transition-all"
              >

                <RefreshCw className="w-5 h-5" />

                {t.another}

              </button>

            </div>

          </div>

        )}

      </div>
    </section>
  )
}
