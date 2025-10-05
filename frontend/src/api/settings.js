import api from './api.js';

const validSections = ['logo', 'footer_content', 'club', 'contact', 'social', 'rights']

const fetchSettings = async (sections) => {
    if(!Array.isArray(sections)) {
        return {
            success: false,
            msg: 'Invalid parameter',
            config: null
        }
    }

    sections.forEach((elem) => {
        if(!validSections.includes(elem)) {
            return {
                success: false,
                msg: 'Invalid section',
                config: null
            }
        }
    })

    try {
        const res = await api.get(
            'main/settings/',
            {
                params: {
                    section: sections.join(',')
                }
            }
        );
        if(res.status === 200) {
            return {
                success: true,
                msg: res.data.message,
                config: res.data.config
            }
        }
    } catch (err) {
        if(err?.response.status === 503) {
            return {
                success: false,
                msg: 'Site settings are not configured',
                config: null
            }
        } else if(err?.response.status === 404) {
            return {
                success: false,
                msg: 'No settings found for this section'
            }
        } else {
            console.error('Failed to fetch settings:', err?.response.data)
        }
    }
}

export default fetchSettings;
