"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let WhatsappService = class WhatsappService {
    config;
    constructor(config) {
        this.config = config;
    }
    isConfigured() {
        return Boolean(this.config.get('WHATSAPP_PHONE_NUMBER_ID') && this.config.get('WHATSAPP_ACCESS_TOKEN'));
    }
    senderNumber() { return this.config.get('WHATSAPP_SENDER_NUMBER') || ''; }
    async sendPaymentReminder(phone, memberName, dueDate) {
        if (!this.isConfigured()) {
            throw new common_1.ServiceUnavailableException('WhatsApp todavía no está configurado.');
        }
        const phoneNumberId = this.config.getOrThrow('WHATSAPP_PHONE_NUMBER_ID');
        const token = this.config.getOrThrow('WHATSAPP_ACCESS_TOKEN');
        const graphVersion = this.config.get('WHATSAPP_GRAPH_VERSION') || 'v23.0';
        const template = this.config.get('WHATSAPP_PAYMENT_TEMPLATE') || 'recordatorio_cuota_gimnasio';
        const response = await fetch(`https://graph.facebook.com/${graphVersion}/${phoneNumberId}/messages`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                to: phone.replace(/\D/g, ''),
                type: 'template',
                template: {
                    name: template,
                    language: { code: 'es_AR' },
                    components: [{
                            type: 'body',
                            parameters: [
                                { type: 'text', text: memberName },
                                { type: 'text', text: dueDate.toLocaleDateString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }) },
                            ],
                        }],
                },
            }),
        });
        const body = await response.json();
        if (!response.ok)
            throw new Error(body.error?.message || 'WhatsApp rechazó el mensaje.');
        return body.messages?.[0]?.id || null;
    }
};
exports.WhatsappService = WhatsappService;
exports.WhatsappService = WhatsappService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], WhatsappService);
//# sourceMappingURL=whatsapp.service.js.map