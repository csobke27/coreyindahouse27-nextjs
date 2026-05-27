type DbdCharacter = {
    _id: string;
    name: string;
}

export function CharacterForm({id, name, playerType, ownedSurvivors, unownedSurvivors, onMoveToUnowned, onMoveToOwned, onNameChange} : {id?: string, name?: string, playerType?: "survivor" | "killer", ownedSurvivors?: DbdCharacter[], unownedSurvivors?: DbdCharacter[], onMoveToUnowned?: (playerId: string, characterId: string, playerType: "survivor" | "killer") => void, onMoveToOwned?: (playerId: string, characterId: string, playerType: "survivor" | "killer") => void, onNameChange?: (playerId: string, newName: string) => void}) {

    const handleOwnedSurvivorClick = (survivor: DbdCharacter) => {
        console.log(`Clicked on owned survivor: ${survivor.name}`);
        if (!id || !playerType) {
            return;
        }

        onMoveToUnowned?.(id, survivor._id, playerType)
    }

    const handleUnownedSurvivorClick = (survivor: DbdCharacter) => {
        console.log(`Clicked on unowned survivor: ${survivor.name}`);
        if (!id || !playerType) {
            return;
        }

        onMoveToOwned?.(id, survivor._id, playerType)
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!id) {
            return;
        }
        onNameChange?.(id, event.target.value);
    }

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 text-center">
                <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder={playerType === "killer" ? "Killer Name" : "Survivor Name"}
                    className="w-full md:w-auto px-4 py-2 mb-4 text-lg font-bold text-center border-2 border-[rgba(0,0,0,0.2)] bg-[rgba(255,255,255,0.1)] rounded focus:outline-none focus:ring-2 focus:ring-[rgba(255,255,255,0.3)] transition-colors duration-300"
                />
                {/* <h1 className="text-2xl font-bold mb-2">{name}</h1> */}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <h2 className="text-lg font-bold mb-2">Owned {playerType === "killer" ? "Killers" : "Survivors"}</h2>
                    <ul className="text-left mb-5 h-48 overflow-y-auto border-2 border-[rgba(0,0,0,0.2)] bg-[rgba(255,255,255,0.1)]">
                        {ownedSurvivors?.map((survivor) => {
                            return <li onClick={() => handleOwnedSurvivorClick(survivor)} key={survivor._id} className="cursor-pointer py-[2px] hover:bg-[rgba(255,255,255,0.2)]">{survivor.name}</li>
                        })}
                    </ul>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-2">Unowned {playerType === "killer" ? "Killers" : "Survivors"}</h2>
                    <ul className="text-left mb-5 h-48 overflow-y-auto border-2 border-[rgba(0,0,0,0.2)] bg-[rgba(255,255,255,0.1)]">
                        {unownedSurvivors?.map((survivor) => {
                            return <li onClick={() => handleUnownedSurvivorClick(survivor)} key={survivor._id} className="cursor-pointer py-[2px] hover:bg-[rgba(255,255,255,0.2)]">{survivor.name}</li>
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}