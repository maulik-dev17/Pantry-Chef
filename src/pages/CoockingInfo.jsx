import React, { useState } from 'react'
import { Leaf, Beef, Clock, GraduationCap, UtensilsCrossed, Blend, ChefHat, ArrowRight } from 'lucide-react'
import '../styles/CookingInfo.css'
import { Link } from 'react-router-dom'

const TIME_OPTIONS = ['15 min', '30 min', '45 min', '60+ min']

const EXPERIENCE_OPTIONS = [
    {
        id: 'beginner',
        label: 'Beginner',
        desc: 'Just starting out. Need simple instructions and easy techniques.',
        Icon: UtensilsCrossed,
    },
    {
        id: 'intermediate',
        label: 'Intermediate',
        desc: 'Comfortable in the kitchen. Can handle moderate multitasking.',
        Icon: Blend,
    },
    {
        id: 'advanced',
        label: 'Advanced',
        desc: 'Confident cook. Ready for complex flavor profiles and techniques.',
        Icon: ChefHat,
    },
]

function CheckBadge() {
    return (
        <span className="ci-badge">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 5L4 7.5L8.5 2" stroke="#1F4620" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </span>
    )
}

function DietCard({ selected, onClick, title, desc, children, iconClassName }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`ci-diet-card${selected ? ' ci-diet-card--selected' : ''}`}
        >
            {selected && <CheckBadge />}
            <div className={`ci-diet-icon${iconClassName ? ' ' + iconClassName : ''}`}>{children}</div>
            <div className="ci-card-title">{title}</div>
            <p className="ci-card-desc">{desc}</p>
        </button>
    )
}

function CookingInfo() {
    const [diet, setDiet] = useState('vegetarian')
    const [time, setTime] = useState('30 min')
    const [experience, setExperience] = useState('intermediate')

    return (
        <div className="ci-page">
            <div className="ci-container">
                {/* Step indicator */}
                <div className="ci-step">
                    <Clock size={14} strokeWidth={2} />
                    <span>Step 2 of 2</span>
                </div>

                {/* Heading */}
                <h1 className="ci-heading">
                    Tell us a little about your
                    <br />
                    cooking.
                </h1>
                <p className="ci-subheading">
                    We'll use this to tailor recipe recommendations perfectly suited to your lifestyle and
                    kitchen skills.
                </p>

                {/* Content grid */}
                <div className="ci-grid">
                    {/* Dietary Preference */}
                    <section className="ci-section">
                        <div className="ci-section-header">
                            <UtensilsCrossed size={18} color="#1F4620" strokeWidth={2} />
                            <h2 className="ci-section-title">Dietary Preference</h2>
                        </div>

                        <div className="ci-diet-list">
                            <DietCard
                                selected={diet === 'vegetarian'}
                                onClick={() => setDiet('vegetarian')}
                                title="Vegetarian"
                                desc="Plant-based goodness."
                            >
                                <Leaf size={28} color="#1F4620" strokeWidth={1.75} />
                            </DietCard>

                            <DietCard
                                selected={diet === 'non-vegetarian'}
                                onClick={() => setDiet('non-vegetarian')}
                                title="Non-Vegetarian"
                                desc="Meat and poultry included."
                                iconClassName="ci-diet-icon--rust"
                            >
                                <Beef size={22} color="#A3552B" strokeWidth={1.75} />
                            </DietCard>
                        </div>
                    </section>

                    {/* Right column */}
                    <div className="ci-right-col">
                        {/* Available Time */}
                        <section className="ci-section">
                            <div className="ci-section-header ci-section-header--tight">
                                <Clock size={18} color="#1F4620" strokeWidth={2} />
                                <h2 className="ci-section-title">Available Time</h2>
                            </div>
                            <p className="ci-section-desc">How much time do you usually have to prep and cook a meal?</p>

                            <div className="ci-time-list">
                                {TIME_OPTIONS.map((opt) => {
                                    const isSelected = time === opt
                                    return (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => setTime(opt)}
                                            className={`ci-time-pill${isSelected ? ' ci-time-pill--selected' : ''}`}
                                        >
                                            {opt}
                                        </button>
                                    )
                                })}
                            </div>
                        </section>

                        {/* Cooking Experience */}
                        <section className="ci-section">
                            <div className="ci-section-header">
                                <GraduationCap size={18} color="#1F4620" strokeWidth={2} />
                                <h2 className="ci-section-title">Cooking Experience</h2>
                            </div>

                            <div className="ci-experience-grid">
                                {EXPERIENCE_OPTIONS.map(({ id, label, desc, Icon }) => {
                                    const isSelected = experience === id
                                    return (
                                        <button
                                            key={id}
                                            type="button"
                                            onClick={() => setExperience(id)}
                                            className={`ci-experience-card${isSelected ? ' ci-experience-card--selected' : ''}`}
                                        >
                                            {isSelected && <CheckBadge />}
                                            <Icon size={20} color="#14171A" strokeWidth={1.75} className="ci-experience-icon" />
                                            <div className="ci-card-title">{label}</div>
                                            <p className="ci-experience-desc">{desc}</p>
                                        </button>
                                    )
                                })}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Footer */}
                <div className="ci-footer">
                    <Link to={"/RecipeFind"}>
                        <button type="button" onClick={() => console.log({ diet, time, experience })} className="ci-submit">
                            Find My Recipes
                            <ArrowRight size={16} strokeWidth={2} />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CookingInfo