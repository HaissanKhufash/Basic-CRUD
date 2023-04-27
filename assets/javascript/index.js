import activatePanel from "./aside_m_config.js";
import requestingData from "./petition.js";

const interactions = e => {
    activatePanel()
    requestingData()
}

document
.addEventListener('DOMContentLoaded', interactions)