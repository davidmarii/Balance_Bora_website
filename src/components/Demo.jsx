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
  DollarSign,
  Scale,
  Search,
  Users,
  Milk,
  Info,
  AlertTriangle,
  ChevronDown,
  Languages,
  Save,
} from 'lucide-react'

/*
  BalanceBora Farmer Feed Formulator
  ----------------------------------
  This component is intentionally self-contained.

  Current version:
  - Mobile-first farmer interface
  - Animal selection
  - Number of animals
  - Production / body weight
  - Ingredient selection
  - Ingredient search
  - Budget
  - Demonstration ration calculation
  - Nutrient and cost summary

  IMPORTANT:
  The current formulation calculation is a demonstration.
  The next version should use a proper least-cost linear programming
  engine with scientifically validated nutrient requirements,
  ingredient constraints and inclusion limits.
*/

const animals = [
  {
    id: 'dairy-cow',
    name: 'Dairy Cow',
    icon: Beef,
    desc: 'Lactating cow',
    defaultProduction: 10,
    productionLabel: 'Milk per day',
    productionUnit: 'L/day',
    stage: 'Lactating',
  },
  {
    id: 'goat',
    name: 'Dairy Goat',
    icon: Rabbit,
    desc: 'Lactating goat',
    defaultProduction: 3,
    productionLabel: 'Milk per day',
    productionUnit: 'L/day',
    stage: 'Lactating',
  },
  {
    id: 'sheep',
    name: 'Meat Sheep',
    icon: Dog,
    desc: 'Growing sheep',
    defaultProduction: 30,
    productionLabel: 'Body weight',
    productionUnit: 'kg',
    stage: 'Growing',
  },
]

const feeds = [
  {
    id: 'napier',
    name: 'Napier Grass',
    type: 'Forage',
    price: 8,
    dm: 18,
    cp: 10,
    energy: 1.8,
    icon: Leaf,
  },
  {
    id: 'maize-silage',
    name: 'Maize Silage',
    type: 'Forage',
    price: 12,
    dm: 30,
    cp: 8,
    energy: 2.0,
    icon: Sprout,
  },
  {
    id: 'dairy-meal',
    name: 'Dairy Meal',
    type: 'Concentrate',
    price: 45,
    dm: 88,
    cp: 18,
    energy: 3.2,
    icon: Circle,
  },
  {
    id: 'sunflower',
    name: 'Sunflower Cake',
    type: 'Protein',
    price: 35,
    dm: 90,
    cp: 32,
    energy: 2.5,
    icon: Star,
  },
  {
    id: 'wheat-bran',
    name: 'Wheat Bran',
    type: 'Concentrate',
    price: 22,
    dm: 89,
    cp: 15,
    energy: 2.6,
    icon: Sprout,
  },
  {
    id: 'fish-meal',
    name: 'Fish Meal',
    type: 'Protein',
    price: 85,
    dm: 92,
    cp: 55,
    energy: 3.8,
    icon: Fish,
  },
  {
    id: 'molasses',
    name: 'Molasses',
    type: 'Energy',
    price: 18,
    dm: 75,
    cp: 4,
    energy: 2.9,
    icon: Droplets,
  },
  {
    id: 'lucerne',
    name: 'Lucerne Hay',
    type: 'Forage',
    price: 25,
    dm: 90,
    cp: 18,
    energy: 1.9,
    icon: Leaf,
  },
]

const requirements = {
  'dairy-cow': {
    baseDM: 18,
    cp: 16,
    energy: 2.8,
    name: 'Dairy Cow',
  },
  goat: {
    baseDM: 3.5,
    cp: 14,
    energy: 2.6,
    name: 'Dairy Goat',
  },
  sheep: {
    baseDM: 2.0,
    cp: 13,
    energy: 2.4,
    name: 'Meat Sheep',
  },
}

const translations = {
  en: {
    formulator: 'Feed Formulator',
    subtitle:
      'Create an affordable ration using ingredients available on your farm.',
    animal: '1. Choose your animal',
    animals: 'animals',
    next: 'Continue',
    back: 'Back',
    production: '2. Tell us about your animals',
    numberAnimals: 'Number of animals',
    production: 'Production / body weight',
    ingredients: '3. Select ingredients you have',
    search: 'Search ingredients...',
    selected: 'selected',
    minimumIngredients: 'Select at least 3 ingredients.',
    budgetTitle: '4. Set your feed budget',
    dailyBudget: 'Daily feed budget',
    formulate: 'Formulate Feed',
    optimizing: 'Calculating...',
    summary: 'Your farm summary',
    result: 'Your feed plan',
    totalCost: 'Total daily cost',
    costPerAnimal: 'Cost per animal',
    dryMatter: 'Dry matter',
    crudeProtein: 'Crude protein',
    energy: 'Energy density',
    required: 'Target',
    ration: 'Daily ration',
    asFed: 'As-fed',
    dryMatterShort: 'DM',
    save: 'Save Feed',
    another: 'Create Another Feed',
    affordable: 'Under budget',
    overBudget: 'Over budget',
    warning: 'Please review this ration',
    warningText:
      'The selected ingredients may not provide enough nutrients to meet the target. This is a demonstration result and should be professionally validated before feeding animals.',
    farmerTip: 'Farmer tip',
    farmerTipText:
      'Ingredient prices can strongly affect the cheapest ration. Keep your local prices updated for better recommendations.',
    language: 'Language',
  },
  sw: {
    formulator: 'Kitengeneza Chakula',
    subtitle:
      'Tengeneza mchanganyiko wa chakula kwa kutumia malighafi zinazopatikana shambani.',
    animal: '1. Chagua mnyama',
    animals: 'wanyama',
    next: 'Endelea',
    back: 'Rudi',
    production: '2. Tueleze kuhusu wanyama wako',
    numberAnimals: 'Idadi ya wanyama',
    production: 'Uzalishaji / uzito',
    ingredients: '3. Chagua malighafi ulizonazo',
    search: 'Tafuta malighafi...',
    selected: 'zimechaguliwa',
    minimumIngredients: 'Chagua angalau malighafi 3.',
    budgetTitle: '4. Weka bajeti ya chakula',
    dailyBudget: 'Bajeti ya chakula kwa siku',
    formulate: 'Tengeneza Chakula',
    optimizing: 'Inahesabu...',
    summary: 'Muhtasari wa shamba',
    result: 'Mpango wako wa chakula',
    totalCost: 'Gharama kwa siku',
    costPerAnimal: 'Gharama kwa mnyama',
    dryMatter: 'Mambo makavu',
    crudeProtein: 'Protini ghafi',
    energy: 'Nishati',
    required: 'Lengo',
    ration: 'Chakula cha kila siku',
    asFed: 'Kiasi halisi',
    dryMatterShort: 'DM',
    save: 'Hifadhi Chakula',
    another: 'Tengeneza Chakula Kingine',
    affordable: 'Ndani ya bajeti',
    overBudget: 'Juu ya bajeti',
    warning: 'Kagua mchanganyiko huu',
    warningText:
      'Malighafi zilizochaguliwa huenda zisitoshe kukidhi mahitaji ya virutubisho. Haya ni makadirio ya majaribio na yanahitaji uthibitisho wa kitaalamu kabla ya kulisha wanyama.',
    farmerTip: 'Ushauri kwa mkulima',
    farmerTipText:
      'Bei za malighafi zinaweza kubadilisha gharama ya chakula. Weka bei za eneo lako ili kupata mapendekezo bora.',
    language: 'Lugha',
  },
}

export default function Demo() {
  const [step, setStep] = useState(1)
  const [language, setLanguage] = useState('en')

  const [selectedAnimal, setSelectedAnimal] = useState(null)
  const [animalCount, setAnimalCount] = useState(1)
  const [production, setProduction] = useState(10)

  const [selectedFeeds, setSelectedFeeds] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const [budget, setBudget] = useState(500)

  const [result, setResult] = useState(null)
  const [formulating, setFormulating] = useState(false)

  const t = translations[language]

  const currentAnimal = animals.find(
    (animal) => animal.id === selectedAnimal
  )

  const filteredFeeds = useMemo(() => {
    const query = searchTerm.toLowerCase().trim()

    if (!query) return feeds

    return feeds.filter(
      (feed) =>
        feed.name.toLowerCase().includes(query) ||
        feed.type.toLowerCase().includes(query)
    )
  }, [searchTerm])

  const toggleFeed = (feedId) => {
    setSelectedFeeds((previous) =>
      previous.includes(feedId)
        ? previous.filter((id) => id !== feedId)
        : [...previous, feedId]
    )
  }

  const handleAnimalSelect = (animalId) => {
    const animal = animals.find((item) => item.id === animalId)

    setSelectedAnimal(animalId)
    setProduction(animal?.defaultProduction || 10)
    setResult(null)
  }

  const handleFormulate = () => {
    if (!selectedAnimal || selectedFeeds.length < 3) return

    setFormulating(true)

    setTimeout(() => {
      const animalReq = requirements[selectedAnimal]

      /*
        Demonstration scaling.

        In the production version, requirements should be calculated
        from validated equations based on:
        - body weight
        - milk production
        - physiological stage
        - breed
        - environmental conditions
      */

      let dmPerAnimal = animalReq.baseDM

      if (selectedAnimal === 'dairy-cow') {
        dmPerAnimal = Math.max(
          10,
          Math.min(22, 12 + production * 0.4)
        )
      }

      if (selectedAnimal === 'goat') {
        dmPerAnimal = Math.max(
          2,
          Math.min(5, 2.4 + production * 0.35)
        )
      }

      if (selectedAnimal === 'sheep') {
        dmPerAnimal = Math.max(
          1.2,
          Math.min(2.5, production * 0.03)
        )
      }

      const totalRequiredDM = dmPerAnimal * animalCount

      const chosenFeeds = feeds.filter((feed) =>
        selectedFeeds.includes(feed.id)
      )

      /*
        Demonstration allocation.

        Cheaper ingredients receive a larger share while ensuring
        several selected ingredients are represented.
      */

      const sortedFeeds = [...chosenFeeds].sort(
        (a, b) => a.price - b.price
      )

      const ration = []

      let remainingDM = totalRequiredDM

      const baseShare = 1 / sortedFeeds.length

      sortedFeeds.forEach((feed, index) => {
        if (remainingDM <= 0) return

        let share = baseShare

        if (feed.type === 'Protein') {
          share = Math.max(0.12, baseShare)
        }

        if (index === sortedFeeds.length - 1) {
          share = 1
        }

        let amount = totalRequiredDM * share

        if (index === sortedFeeds.length - 1) {
          amount = remainingDM
        }

        amount = Math.min(amount, remainingDM)

        const dryMatterFraction = feed.dm / 100

        const asFedKg = amount / dryMatterFraction

        const cost = asFedKg * feed.price

        ration.push({
          ...feed,
          amountDM: amount,
          asFedKg,
          cost,
          percentage: (amount / totalRequiredDM) * 100,
        })

        remainingDM -= amount
      })

      const totalCost = ration.reduce(
        (sum, item) => sum + item.cost,
        0
      )

      const totalDM = ration.reduce(
        (sum, item) => sum + item.amountDM,
        0
      )

      const totalCP = ration.reduce(
        (sum, item) => sum + item.amountDM * (item.cp / 100),
        0
      )

      const totalEnergy = ration.reduce(
        (sum, item) => sum + item.amountDM * item.energy,
        0
      )

      const cpPct =
        totalDM > 0 ? (totalCP / totalDM) * 100 : 0

      const energyDensity =
        totalDM > 0 ? totalEnergy / totalDM : 0

      const costPerAnimal =
        animalCount > 0 ? totalCost / animalCount : 0

      const dailyBudget = budget

      const savings = dailyBudget - totalCost

      const cpAdequacy =
        animalReq.cp > 0
          ? (cpPct / animalReq.cp) * 100
          : 0

      const energyAdequacy =
        animalReq.energy > 0
          ? (energyDensity / animalReq.energy) * 100
          : 0

      const nutritionallyAdequate =
        cpAdequacy >= 90 && energyAdequacy >= 90

      setResult({
        ration,
        totalCost,
        totalDM,
        totalCP,
        totalEnergy,
        cpPct,
        energyDensity,
        costPerAnimal,
        savings,
        nutritionallyAdequate,
        cpAdequacy,
        energyAdequacy,
        requiredDM: totalRequiredDM,
        dmPerAnimal,
        req: animalReq,
        animalCount,
      })

      setFormulating(false)
      setStep(5)
    }, 1200)
  }

  const reset = () => {
    setStep(1)
    setSelectedAnimal(null)
    setAnimalCount(1)
    setProduction(10)
    setSelectedFeeds([])
    setSearchTerm('')
    setBudget(500)
    setResult(null)
  }

  const canContinueFromStep1 =
    selectedAnimal && animalCount > 0 && production > 0

  const canContinueFromStep2 = selectedFeeds.length >= 3

  return (
    <section
      id="demo"
      className="py-12 sm:py-20 lg:py-24 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}

        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-bora-100 text-bora-800 rounded-full text-sm font-semibold mb-4">
            <Calculator className="w-4 h-4" />
            {t.formulator}
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-earth-900 mb-4">
            {t.formulator}
          </h2>

          <p className="text-earth-600 text-base sm:text-lg leading-relaxed">
            {t.subtitle}
          </p>

          {/* LANGUAGE */}

          <div className="flex justify-center mt-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-earth-200 bg-earth-50 p-1">
              <Languages className="w-4 h-4 text-earth-500 ml-2" />

              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition ${
                  language === 'en'
                    ? 'bg-bora-600 text-white'
                    : 'text-earth-600'
                }`}
              >
                English
              </button>

              <button
                type="button"
                onClick={() => setLanguage('sw')}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition ${
                  language === 'sw'
                    ? 'bg-bora-600 text-white'
                    : 'text-earth-600'
                }`}
              >
                Kiswahili
              </button>
            </div>
          </div>
        </div>

        {/* PROGRESS */}

        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between gap-1 sm:gap-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className="flex items-center flex-1 last:flex-none"
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
                    step >= s
                      ? 'bg-bora-600 text-white shadow-md'
                      : 'bg-earth-100 text-earth-400'
                  }`}
                >
                  {step > s ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    s
                  )}
                </div>

                {s < 5 && (
                  <div
                    className={`h-1 flex-1 mx-1 sm:mx-2 rounded-full ${
                      step > s
                        ? 'bg-bora-600'
                        : 'bg-earth-100'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* MAIN CARD */}

        <div className="max-w-5xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-earth-200 shadow-sm overflow-hidden">

          {/* STEP 1 */}

          {step === 1 && (
            <div className="p-5 sm:p-8 lg:p-10">

              <div className="text-center mb-7">
                <h3 className="text-xl sm:text-2xl font-bold text-earth-900">
                  {t.animal}
                </h3>

                <p className="text-earth-500 mt-2 text-sm sm:text-base">
                  Choose the animal you want to feed.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                {animals.map((animal) => {
                  const Icon = animal.icon
                  const selected =
                    selectedAnimal === animal.id

                  return (
                    <button
                      key={animal.id}
                      type="button"
                      onClick={() =>
                        handleAnimalSelect(animal.id)
                      }
                      className={`relative text-left p-5 sm:p-6 rounded-2xl border-2 transition-all active:scale-[0.99] ${
                        selected
                          ? 'border-bora-600 bg-bora-50 shadow-md'
                          : 'border-earth-100 hover:border-bora-200 bg-white'
                      }`}
                    >
                      {selected && (
                        <div className="absolute top-4 right-4">
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
                        {animal.name}
                      </h4>

                      <p className="text-sm text-earth-500 mt-1">
                        {animal.desc}
                      </p>

                      <span className="inline-block mt-3 px-3 py-1 bg-earth-100 text-earth-600 rounded-full text-xs font-medium">
                        {animal.stage}
                      </span>
                    </button>
                  )
                })}
              </div>

              {selectedAnimal && (
                <div className="mt-7 p-5 rounded-2xl bg-earth-50 border border-earth-100">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    <div>
                      <label className="block text-sm font-semibold text-earth-700 mb-2">
                        <Users className="w-4 h-4 inline mr-1" />
                        {t.numberAnimals}
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
                              Number(e.target.value)
                            )
                          )
                        }
                        className="w-full px-4 py-3.5 rounded-xl border border-earth-200 bg-white text-earth-900 font-semibold focus:outline-none focus:ring-2 focus:ring-bora-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-earth-700 mb-2">
                        {currentAnimal?.productionLabel}
                      </label>

                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={production}
                          onChange={(e) =>
                            setProduction(
                              Math.max(
                                0,
                                Number(e.target.value)
                              )
                            )
                          }
                          className="w-full px-4 py-3.5 pr-20 rounded-xl border border-earth-200 bg-white text-earth-900 font-semibold focus:outline-none focus:ring-2 focus:ring-bora-500"
                        />

                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-earth-400">
                          {currentAnimal?.productionUnit}
                        </span>
                      </div>
                    </div>

                  </div>

                  <div className="flex items-start gap-2 mt-4 text-xs sm:text-sm text-earth-500">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>
                      These values help estimate the daily feed requirement.
                      Final production recommendations should use validated
                      animal nutrition equations.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-7">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!canContinueFromStep1}
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-7 py-3.5 bg-bora-600 text-white font-semibold rounded-xl sm:rounded-full hover:bg-bora-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {t.next}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}

          {step === 2 && (
            <div className="p-5 sm:p-8 lg:p-10">

              <div className="text-center mb-7">
                <h3 className="text-xl sm:text-2xl font-bold text-earth-900">
                  {t.ingredients}
                </h3>

                <p className="text-earth-500 mt-2 text-sm sm:text-base">
                  Select ingredients that are available on your farm.
                </p>
              </div>

              {/* SEARCH */}

              <div className="relative mb-5">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-400" />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  placeholder={t.search}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-earth-200 focus:outline-none focus:ring-2 focus:ring-bora-500"
                />
              </div>

              {/* SELECTED COUNT */}

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-earth-600">
                  <strong className="text-earth-900">
                    {selectedFeeds.length}
                  </strong>{' '}
                  {t.selected}
                </span>

                {selectedFeeds.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedFeeds([])}
                    className="text-xs sm:text-sm text-red-500 font-semibold"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* INGREDIENTS */}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

                {filteredFeeds.map((feed) => {
                  const Icon = feed.icon
                  const selected =
                    selectedFeeds.includes(feed.id)

                  return (
                    <button
                      key={feed.id}
                      type="button"
                      onClick={() => toggleFeed(feed.id)}
                      className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                        selected
                          ? 'border-bora-600 bg-bora-50'
                          : 'border-earth-100 bg-white hover:border-bora-200'
                      }`}
                    >
                      {selected && (
                        <div className="absolute top-3 right-3">
                          <CheckCircle2 className="w-5 h-5 text-bora-600" />
                        </div>
                      )}

                      <div
                        className={`w-11 h-11 rounded-lg flex items-center justify-center mb-3 ${
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
                        {feed.name}
                      </h4>

                      <p className="text-xs text-earth-500 mt-1">
                        {feed.type}
                      </p>

                      <div className="mt-3 flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-bora-600" />
                        <span className="font-bold text-bora-700">
                          KES {feed.price}
                        </span>
                        <span className="text-xs text-earth-400">
                          /kg
                        </span>
                      </div>

                      <div className="mt-2 flex gap-2 text-[11px] text-earth-500">
                        <span>CP {feed.cp}%</span>
                        <span>•</span>
                        <span>DM {feed.dm}%</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {filteredFeeds.length === 0 && (
                <div className="text-center py-10 text-earth-500">
                  No ingredients found.
                </div>
              )}

              {selectedFeeds.length < 3 && (
                <div className="flex items-center justify-center gap-2 mt-5 text-sm text-amber-600">
                  <AlertTriangle className="w-4 h-4" />
                  {t.minimumIngredients}
                </div>
              )}

              <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 mt-7">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex justify-center items-center gap-2 px-6 py-3.5 text-earth-600 font-semibold rounded-xl hover:bg-earth-50"
                >
                  <ArrowLeft className="w-5 h-5" />
                  {t.back}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!canContinueFromStep2}
                  className="inline-flex justify-center items-center gap-2 px-7 py-3.5 bg-bora-600 text-white font-semibold rounded-xl sm:rounded-full hover:bg-bora-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {t.next}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}

          {step === 3 && (
            <div className="p-5 sm:p-8 lg:p-10 max-w-2xl mx-auto">

              <div className="text-center mb-7">
                <h3 className="text-xl sm:text-2xl font-bold text-earth-900">
                  {t.budgetTitle}
                </h3>

                <p className="text-earth-500 mt-2 text-sm">
                  Set the maximum amount you want to spend each day.
                </p>
              </div>

              <div className="bg-earth-50 rounded-2xl p-5 sm:p-7">

                <div className="flex items-center justify-between gap-4 mb-5">
                  <span className="text-earth-600 font-medium">
                    {t.dailyBudget}
                  </span>

                  <span className="text-2xl sm:text-3xl font-bold text-bora-700">
                    KES {budget.toLocaleString()}
                  </span>
                </div>

                <input
                  type="range"
                  min="50"
                  max="5000"
                  step="50"
                  value={budget}
                  onChange={(e) =>
                    setBudget(Number(e.target.value))
                  }
                  className="w-full h-2 bg-earth-200 rounded-full appearance-none cursor-pointer accent-bora-600"
                />

                <div className="flex justify-between mt-2 text-xs text-earth-400">
                  <span>KES 50</span>
                  <span>KES 5,000</span>
                </div>

                <div className="mt-5">
                  <label className="block text-sm font-semibold text-earth-700 mb-2">
                    Or enter your budget
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-400">
                      KES
                    </span>

                    <input
                      type="number"
                      min="50"
                      value={budget}
                      onChange={(e) =>
                        setBudget(
                          Math.max(
                            50,
                            Number(e.target.value)
                          )
                        )
                      }
                      className="w-full pl-14 pr-4 py-3.5 rounded-xl border border-earth-200 bg-white font-semibold focus:outline-none focus:ring-2 focus:ring-bora-500"
                    />
                  </div>
                </div>
              </div>

              {/* SUMMARY */}

              <div className="bg-bora-50 rounded-2xl p-5 mt-6">

                <h4 className="font-bold text-earth-900 mb-4">
                  {t.summary}
                </h4>

                <div className="space-y-3 text-sm">

                  <div className="flex justify-between gap-4">
                    <span className="text-earth-600">
                      Animal
                    </span>

                    <span className="font-semibold text-earth-900">
                      {currentAnimal?.name}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-earth-600">
                      Number
                    </span>

                    <span className="font-semibold text-earth-900">
                      {animalCount} {t.animals}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-earth-600">
                      Production / weight
                    </span>

                    <span className="font-semibold text-earth-900">
                      {production} {currentAnimal?.productionUnit}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-earth-600">
                      Ingredients
                    </span>

                    <span className="font-semibold text-earth-900">
                      {selectedFeeds.length}
                    </span>
                  </div>

                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 mt-7">

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex justify-center items-center gap-2 px-6 py-3.5 text-earth-600 font-semibold rounded-xl hover:bg-earth-50"
                >
                  <ArrowLeft className="w-5 h-5" />
                  {t.back}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="inline-flex justify-center items-center gap-2 px-7 py-3.5 bg-bora-600 text-white font-bold rounded-xl sm:rounded-full hover:bg-bora-700 transition shadow-lg"
                >
                  Review
                  <ArrowRight className="w-5 h-5" />
                </button>

              </div>
            </div>
          )}

          {/* STEP 4 */}

          {step === 4 && (
            <div className="p-5 sm:p-8 lg:p-10 max-w-3xl mx-auto">

              <div className="text-center mb-7">
                <h3 className="text-xl sm:text-2xl font-bold text-earth-900">
                  Review Your Farm Information
                </h3>

                <p className="text-earth-500 mt-2 text-sm">
                  Check the information before generating your feed plan.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="rounded-2xl border border-earth-100 bg-earth-50 p-5">
                  <p className="text-xs text-earth-500 mb-1">
                    Animal
                  </p>
                  <p className="font-bold text-earth-900">
                    {currentAnimal?.name}
                  </p>
                </div>

                <div className="rounded-2xl border border-earth-100 bg-earth-50 p-5">
                  <p className="text-xs text-earth-500 mb-1">
                    Number of animals
                  </p>
                  <p className="font-bold text-earth-900">
                    {animalCount}
                  </p>
                </div>

                <div className="rounded-2xl border border-earth-100 bg-earth-50 p-5">
                  <p className="text-xs text-earth-500 mb-1">
                    Production / weight
                  </p>
                  <p className="font-bold text-earth-900">
                    {production} {currentAnimal?.productionUnit}
                  </p>
                </div>

                <div className="rounded-2xl border border-earth-100 bg-earth-50 p-5">
                  <p className="text-xs text-earth-500 mb-1">
                    Daily budget
                  </p>
                  <p className="font-bold text-bora-700">
                    KES {budget.toLocaleString()}
                  </p>
                </div>

              </div>

              <div className="mt-5 rounded-2xl border border-earth-100 overflow-hidden">

                <div className="px-5 py-4 bg-earth-50">
                  <h4 className="font-bold text-earth-900">
                    Selected ingredients
                  </h4>
                </div>

                <div className="divide-y divide-earth-100">

                  {feeds
                    .filter((feed) =>
                      selectedFeeds.includes(feed.id)
                    )
                    .map((feed) => (
                      <div
                        key={feed.id}
                        className="flex items-center justify-between gap-4 px-5 py-3"
                      >
                        <span className="font-medium text-earth-800">
                          {feed.name}
                        </span>

                        <span className="text-sm text-bora-700 font-semibold">
                          KES {feed.price}/kg
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 mt-7">

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex justify-center items-center gap-2 px-6 py-3.5 text-earth-600 font-semibold rounded-xl hover:bg-earth-50"
                >
                  <ArrowLeft className="w-5 h-5" />
                  {t.back}
                </button>

                <button
                  type="button"
                  onClick={handleFormulate}
                  disabled={formulating}
                  className="inline-flex justify-center items-center gap-2 px-7 py-4 bg-bora-600 text-white font-bold rounded-xl sm:rounded-full hover:bg-bora-700 transition shadow-lg disabled:opacity-60"
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

          {/* STEP 5 / RESULTS */}

          {step === 5 && result && (
            <div className="p-5 sm:p-8 lg:p-10">

              {/* RESULT HEADER */}

              <div className="text-center mb-7">

                <div className="inline-flex items-center gap-2 px-4 py-2 bg-bora-100 text-bora-800 rounded-full text-sm font-semibold mb-4">
                  <CheckCircle2 className="w-4 h-4" />
                  Feed plan created
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-earth-900">
                  {t.result}
                </h3>

                <p className="text-earth-500 mt-2">
                  {currentAnimal?.name} • {result.animalCount}{' '}
                  {t.animals}
                </p>

              </div>

              {/* WARNING */}

              {!result.nutritionallyAdequate && (
                <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">

                  <div className="flex items-start gap-3">

                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />

                    <div>
                      <h4 className="font-bold text-amber-900">
                        {t.warning}
                      </h4>

                      <p className="text-sm text-amber-800 mt-1 leading-relaxed">
                        {t.warningText}
                      </p>
                    </div>

                  </div>
                </div>
              )}

              {/* TOP METRICS */}

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-7">

                <div className="bg-earth-50 rounded-2xl p-4 sm:p-5 text-center">
                  <p className="text-xs text-earth-500 mb-1">
                    {t.totalCost}
                  </p>

                  <p className="text-xl sm:text-2xl font-bold text-earth-900">
                    KES {result.totalCost.toFixed(0)}
                  </p>

                  <p
                    className={`text-xs font-semibold mt-1 flex justify-center items-center gap-1 ${
                      result.savings >= 0
                        ? 'text-bora-600'
                        : 'text-red-500'
                    }`}
                  >
                    {result.savings >= 0 ? (
                      <TrendingDown className="w-3 h-3" />
                    ) : (
                      <TrendingUp className="w-3 h-3" />
                    )}

                    {result.savings >= 0
                      ? t.affordable
                      : t.overBudget}
                  </p>
                </div>

                <div className="bg-earth-50 rounded-2xl p-4 sm:p-5 text-center">
                  <p className="text-xs text-earth-500 mb-1">
                    {t.costPerAnimal}
                  </p>

                  <p className="text-xl sm:text-2xl font-bold text-earth-900">
                    KES {result.costPerAnimal.toFixed(0)}
                  </p>

                  <p className="text-xs text-earth-400 mt-1">
                    per animal/day
                  </p>
                </div>

                <div className="bg-earth-50 rounded-2xl p-4 sm:p-5 text-center">
                  <p className="text-xs text-earth-500 mb-1">
                    {t.crudeProtein}
                  </p>

                  <p className="text-xl sm:text-2xl font-bold text-earth-900">
                    {result.cpPct.toFixed(1)}%
                  </p>

                  <p className="text-xs text-earth-400 mt-1">
                    {t.required}: {result.req.cp}%
                  </p>
                </div>

                <div className="bg-earth-50 rounded-2xl p-4 sm:p-5 text-center">
                  <p className="text-xs text-earth-500 mb-1">
                    {t.energy}
                  </p>

                  <p className="text-xl sm:text-2xl font-bold text-earth-900">
                    {result.energyDensity.toFixed(1)}
                  </p>

                  <p className="text-xs text-earth-400 mt-1">
                    {t.required}: {result.req.energy}
                  </p>
                </div>

              </div>

              {/* RATION */}

              <div className="bg-white rounded-2xl border border-earth-200 overflow-hidden mb-6">

                <div className="px-5 py-4 bg-earth-50 border-b border-earth-100">

                  <div className="flex items-center justify-between gap-3">

                    <div>
                      <h4 className="font-bold text-earth-900">
                        {t.ration}
                      </h4>

                      <p className="text-xs text-earth-500 mt-1">
                        Total dry matter: {result.totalDM.toFixed(1)} kg/day
                      </p>
                    </div>

                    <Scale className="w-5 h-5 text-bora-600" />

                  </div>

                </div>

                <div className="divide-y divide-earth-100">

                  {result.ration.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 sm:p-5"
                    >

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-bora-50 flex items-center justify-center shrink-0">
                          <item.icon className="w-5 h-5 text-bora-600" />
                        </div>

                        <div className="min-w-0 flex-1">

                          <p className="font-semibold text-earth-900 text-sm sm:text-base">
                            {item.name}
                          </p>

                          <p className="text-xs text-earth-500">
                            {item.type}
                          </p>

                        </div>

                        <div className="text-right">

                          <p className="font-bold text-earth-900 text-sm sm:text-base">
                            {item.asFedKg.toFixed(1)} kg
                          </p>

                          <p className="text-[11px] text-earth-400">
                            as-fed
                          </p>

                        </div>

                      </div>

                      <div className="grid grid-cols-3 gap-3 mt-3 pl-[52px]">

                        <div>
                          <p className="text-[10px] uppercase tracking-wide text-earth-400">
                            DM
                          </p>

                          <p className="text-xs font-semibold text-earth-700">
                            {item.amountDM.toFixed(1)} kg
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-wide text-earth-400">
                            Share
                          </p>

                          <p className="text-xs font-semibold text-earth-700">
                            {item.percentage.toFixed(0)}%
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-wide text-earth-400">
                            Cost
                          </p>

                          <p className="text-xs font-semibold text-bora-700">
                            KES {item.cost.toFixed(0)}
                          </p>
                        </div>

                      </div>

                    </div>
                  ))}

                </div>

                <div className="px-5 py-4 bg-earth-50 border-t border-earth-100 flex justify-between items-center">

                  <span className="font-bold text-earth-900">
                    {t.totalCost}
                  </span>

                  <span className="text-xl font-bold text-bora-700">
                    KES {result.totalCost.toFixed(0)}
                  </span>

                </div>

              </div>

              {/* NUTRITION */}

              <div className="bg-bora-50 rounded-2xl p-5 sm:p-6 mb-6">

                <h4 className="font-bold text-earth-900 mb-5">
                  Nutritional summary
                </h4>

                <div className="space-y-5">

                  {[
                    {
                      label: t.crudeProtein,
                      value: result.cpAdequacy,
                    },
                    {
                      label: t.energy,
                      value: result.energyAdequacy,
                    },
                  ].map((metric) => {

                    const displayValue = Math.min(
                      metric.value,
                      120
                    )

                    return (
                      <div key={metric.label}>

                        <div className="flex justify-between text-sm mb-2">

                          <span className="text-earth-700">
                            {metric.label}
                          </span>

                          <span
                            className={`font-bold ${
                              metric.value >= 90
                                ? 'text-bora-700'
                                : 'text-amber-600'
                            }`}
                          >
                            {Math.round(metric.value)}%
                          </span>

                        </div>

                        <div className="h-2.5 bg-earth-200 rounded-full overflow-hidden">

                          <div
                            className={`h-full rounded-full transition-all ${
                              metric.value >= 90
                                ? 'bg-bora-500'
                                : 'bg-amber-500'
                            }`}
                            style={{
                              width: `${Math.min(
                                displayValue,
                                100
                              )}%`,
                            }}
                          />

                        </div>

                      </div>
                    )
                  })}

                </div>
              </div>

              {/* FARMER TIP */}

              <div className="bg-earth-50 rounded-2xl p-5 mb-7">

                <div className="flex items-start gap-3">

                  <Info className="w-5 h-5 text-bora-600 shrink-0 mt-0.5" />

                  <div>

                    <h4 className="font-bold text-earth-900">
                      {t.farmerTip}
                    </h4>

                    <p className="text-sm text-earth-600 mt-1 leading-relaxed">
                      {t.farmerTipText}
                    </p>

                  </div>

                </div>

              </div>

              {/* ACTIONS */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() => {
                    alert(
                      'Saving feeds will be connected to the BalanceBora farmer database in the next version.'
                    )
                  }}
                  className="inline-flex justify-center items-center gap-2 px-6 py-3.5 bg-bora-600 text-white font-bold rounded-xl hover:bg-bora-700 transition"
                >
                  <Save className="w-5 h-5" />
                  {t.save}
                </button>

                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex justify-center items-center gap-2 px-6 py-3.5 bg-earth-900 text-white font-bold rounded-xl hover:bg-earth-800 transition"
                >
                  <RefreshCw className="w-5 h-5" />
                  {t.another}
                </button>

              </div>

            </div>
          )}

        </div>

        {/* SMALL FOOTNOTE */}

        <div className="max-w-3xl mx-auto mt-6 text-center">
          <p className="text-xs text-earth-400 leading-relaxed">
            BalanceBora results are currently a demonstration. Feed
            formulations should be validated against appropriate animal
            nutrient requirements and locally available ingredient analyses
            before commercial or farm use.
          </p>
        </div>

      </div>
    </section>
  )
}
