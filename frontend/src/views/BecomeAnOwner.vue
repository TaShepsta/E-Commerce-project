<template>
  <div class="owner-page">
    <!-- HERO -->
    <section class="owner-hero">
      <div class="hero-copy">
        <p class="eyebrow">LIST WITH RENTOSPHERE</p>

        <h1>Make the most of what you already own.</h1>

        <p class="lead">
          Turn tools, event gear, camping essentials and everyday appliances
          into extra income while helping local renters find what they need,
          safely and sustainably.
        </p>

        <div class="hero-actions">
          <a href="#owner-form" class="primary-button">
            Start your application
          </a>

          <span class="mini-trust">
            Fast approval • Safety checked • Flexible pricing
          </span>
        </div>

        <div class="hero-stats">
          <div>
            <strong>85%</strong>
            <span>of each rental goes to you</span>
          </div>

          <div>
            <strong>24 hrs</strong>
            <span>typical safety review turnaround</span>
          </div>
        </div>
      </div>

      <div class="hero-visual" aria-label="Rentosphere owner showcase">
        <div class="visual-frame">
          <img
            src="https://i.ibb.co/dJkntzMR/starting-your-own-business.jpg"
            alt="A person preparing rental equipment for a project"
          />
        </div>

        <div class="floating-card">
          <strong>Smart income</strong>
          <span>Up to R2,200/month</span>
          <small>from a few well-rented essentials</small>
        </div>
      </div>
    </section>

    <!-- BENEFITS -->
    <section class="benefits-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">WHY OWNERS JOIN</p>

          <h2>
            Built for people who want
            <span>more from what they already have.</span>
          </h2>
        </div>
      </div>

      <div class="benefits-grid">
        <article class="benefit-card">
          <div class="benefit-icon" aria-hidden="true">💸</div>

          <h3>Extra income</h3>

          <p>
            Turn unused items into a steady income stream without changing your
            everyday routine.
          </p>
        </article>

        <article class="benefit-card">
          <div class="benefit-icon" aria-hidden="true">🤝</div>

          <h3>Local renters</h3>

          <p>
            Help nearby families, students and event planners access what they
            need right in their own community.
          </p>
        </article>

        <article class="benefit-card">
          <div class="benefit-icon" aria-hidden="true">🛡️</div>

          <h3>Safety evaluation</h3>

          <p>
            Every item is reviewed before it goes live, so you can list with
            confidence and clarity.
          </p>
        </article>

        <article class="benefit-card">
          <div class="benefit-icon" aria-hidden="true">🌿</div>

          <h3>Sustainability</h3>

          <p>
            Keep valuable items in circulation, reduce waste and make sharing a
            smarter everyday choice.
          </p>
        </article>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="steps-section">
      <div class="section-heading step-heading">
        <div>
          <p class="eyebrow">HOW IT WORKS</p>

          <h2>
            Simple steps to start
            <span>earning.</span>
          </h2>
        </div>
      </div>

      <div class="steps-flow" aria-label="How it works">
        <div class="step-item">
          <span class="step-number">01</span>

          <strong>Apply</strong>

          <p>
            Provide your personal, address and banking details.
          </p>
        </div>

        <div class="step-arrow" aria-hidden="true">→</div>

        <div class="step-item">
          <span class="step-number">02</span>

          <strong>Get Approved</strong>

          <p>
            Our team reviews your owner application.
          </p>
        </div>

        <div class="step-arrow" aria-hidden="true">→</div>

        <div class="step-item">
          <span class="step-number">03</span>

          <strong>List</strong>

          <p>
            Once approved, add your rental items, pricing and photos.
          </p>
        </div>

        <div class="step-arrow" aria-hidden="true">→</div>

        <div class="step-item">
          <span class="step-number">04</span>

          <strong>Earn</strong>

          <p>
            Receive bookings and grow your rental income.
          </p>
        </div>
      </div>
    </section>

    <!-- ITEMS -->
    <section class="items-section">
      <div class="section-heading small-heading">
        <div>
          <p class="eyebrow">ITEMS PEOPLE RENT</p>

          <h2>
            Popular categories to list on
            <span>Rentosphere.</span>
          </h2>
        </div>
      </div>

      <div class="items-grid">
        <article class="item-card">
          <div class="item-icon" aria-hidden="true">🔧</div>

          <h3>Tools</h3>

          <p>
            Drills, saws, ladders and project essentials.
          </p>
        </article>

        <article class="item-card">
          <div class="item-icon" aria-hidden="true">🎉</div>

          <h3>Event equipment</h3>

          <p>
            Chairs, lighting, decor and celebration gear.
          </p>
        </article>

        <article class="item-card">
          <div class="item-icon" aria-hidden="true">⛺</div>

          <h3>Camping gear</h3>

          <p>
            Tents, coolers, lanterns and outdoor essentials.
          </p>
        </article>

        <article class="item-card">
          <div class="item-icon" aria-hidden="true">🏠</div>

          <h3>Appliances</h3>

          <p>
            Kitchen and home items that make life easier.
          </p>
        </article>
      </div>
    </section>

    <!-- OWNER APPLICATION -->
    <section id="owner-form" class="owner-form-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">OWNER APPLICATION</p>

          <h2>
            Tell us about
            <span>yourself.</span>
          </h2>
        </div>

        <p>
          Complete your owner details so we can review your application and
          prepare your account for renting and receiving payments.
        </p>
      </div>

      <div class="owner-wrapper">
        <!-- NOT LOGGED IN AS AN OWNER YET -->
        <div v-if="!canApply" class="safety-alert">
          <div class="safety-icon" aria-hidden="true">
            &#128274;
          </div>

          <div>
            <strong>{{ gateTitle }}</strong>

            <p>{{ gateMessage }}</p>

            <RouterLink
              v-if="!isAuthenticated"
              to="/signup/owner"
              class="btn-primary"
              style="display:inline-block;margin-top:12px;text-decoration:none;"
            >
              Sign up as an Owner
            </RouterLink>
          </div>
        </div>

        <template v-else>
          <!-- REAL APPLICATION STATUS -->
          <div v-if="applicationStatus" class="safety-alert">
            <div class="safety-icon" aria-hidden="true">
              {{ statusIcon }}
            </div>

            <div>
              <strong>{{ statusTitle }}</strong>
              <p>{{ statusMessage }}</p>
            </div>
          </div>

          <!-- SAFETY MESSAGE -->
          <div v-if="applicationStatus !== 'approved'" class="safety-alert">
            <div class="safety-icon" aria-hidden="true">
              &#128737;
            </div>

            <div>
              <strong>Safety Evaluation Required</strong>

              <p>
                Your owner application must be reviewed before you can start
                posting rental items on Rentosphere.
              </p>
            </div>
          </div>

        <!-- OWNER FORM -->
        <form
          v-if="applicationStatus !== 'approved'"
          @submit.prevent="submitOwnerApplication"
          class="owner-form"
        >
          <!-- PERSONAL DETAILS -->
          <div class="form-section-title">
            <span class="form-section-number">01</span>

            <div>
              <h3>Personal Details</h3>

              <p>
                Tell us who you are so we can set up your owner profile.
              </p>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="fullName">
                Full Name *
              </label>

              <input
                id="fullName"
                v-model.trim="form.fullName"
                type="text"
                placeholder="e.g. John Doe"
                autocomplete="name"
                required
              />
            </div>

            <div class="form-group">
              <label for="phone">
                Phone Number *
              </label>

              <input
                id="phone"
                v-model.trim="form.phone"
                type="tel"
                placeholder="e.g. 071 234 5678"
                autocomplete="tel"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="email">
              Email Address *
            </label>

            <input
              id="email"
              v-model.trim="form.email"
              type="email"
              placeholder="e.g. you@example.com"
              autocomplete="email"
              required
            />
          </div>

          <!-- ADDRESS -->
          <div class="form-section-title">
            <span class="form-section-number">02</span>

            <div>
              <h3>Where You Stay</h3>

              <p>
                Provide your address so we know where your rental items are
                located.
              </p>
            </div>
          </div>

          <div class="form-group">
            <label for="address">
              Street Address *
            </label>

            <input
              id="address"
              v-model.trim="form.address"
              type="text"
              placeholder="e.g. 24 Main Road"
              autocomplete="street-address"
              required
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="city">
                City *
              </label>

              <input
                id="city"
                v-model.trim="form.city"
                type="text"
                placeholder="e.g. Cape Town"
                autocomplete="address-level2"
                required
              />
            </div>

            <div class="form-group">
              <label for="province">
                Province *
              </label>

              <select
                id="province"
                v-model="form.province"
                required
              >
                <option value="" disabled>
                  Select province
                </option>

                <option value="Eastern Cape">
                  Eastern Cape
                </option>

                <option value="Free State">
                  Free State
                </option>

                <option value="Gauteng">
                  Gauteng
                </option>

                <option value="KwaZulu-Natal">
                  KwaZulu-Natal
                </option>

                <option value="Limpopo">
                  Limpopo
                </option>

                <option value="Mpumalanga">
                  Mpumalanga
                </option>

                <option value="Northern Cape">
                  Northern Cape
                </option>

                <option value="North West">
                  North West
                </option>

                <option value="Western Cape">
                  Western Cape
                </option>
              </select>
            </div>
          </div>

          <div class="form-group postal-group">
            <label for="postalCode">
              Postal Code *
            </label>

            <input
              id="postalCode"
              v-model.trim="form.postalCode"
              type="text"
              inputmode="numeric"
              maxlength="4"
              placeholder="e.g. 7785"
              autocomplete="postal-code"
              required
            />
          </div>

          <!-- BANKING DETAILS -->
          <div class="form-section-title">
            <span class="form-section-number">03</span>

            <div>
              <h3>Banking Details</h3>

              <p>
                These details will be used for owner payouts when your rental
                items generate income.
              </p>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="bankName">
                Bank Name *
              </label>

              <select
                id="bankName"
                v-model="form.bankName"
                required
              >
                <option value="" disabled>
                  Select bank
                </option>

                <option value="Absa">
                  Absa
                </option>

                <option value="Capitec">
                  Capitec
                </option>

                <option value="Discovery Bank">
                  Discovery Bank
                </option>

                <option value="FNB">
                  FNB
                </option>

                <option value="Investec">
                  Investec
                </option>

                <option value="Nedbank">
                  Nedbank
                </option>

                <option value="Standard Bank">
                  Standard Bank
                </option>

                <option value="TymeBank">
                  TymeBank
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="accountHolder">
                Account Holder *
              </label>

              <input
                id="accountHolder"
                v-model.trim="form.accountHolder"
                type="text"
                placeholder="Name on bank account"
                autocomplete="name"
                required
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="accountNumber">
                Account Number *
              </label>

              <input
                id="accountNumber"
                v-model.trim="form.accountNumber"
                type="text"
                inputmode="numeric"
                placeholder="Enter account number"
                autocomplete="off"
                required
              />
            </div>

            <div class="form-group">
              <label for="accountType">
                Account Type *
              </label>

              <select
                id="accountType"
                v-model="form.accountType"
                required
              >
                <option value="" disabled>
                  Select account type
                </option>

                <option value="Cheque">
                  Cheque
                </option>

                <option value="Current">
                  Current
                </option>

                <option value="Savings">
                  Savings
                </option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="branchCode">
              Branch Code *
            </label>

            <input
              id="branchCode"
              v-model.trim="form.branchCode"
              type="text"
              inputmode="numeric"
              maxlength="10"
              placeholder="Enter branch code"
              autocomplete="off"
              required
            />
          </div>

          <!-- PRIVACY NOTE -->
          <div class="privacy-note">
            <div class="privacy-icon" aria-hidden="true">
              🔒
            </div>

            <div>
              <strong>Your information is important</strong>

              <p>
                Banking details should only be submitted through a secure
                application process. Do not share your banking information
                through chat messages or public listings.
              </p>
            </div>
          </div>

          <!-- SUBMIT -->
          <button
            type="submit"
            class="btn-primary full-width"
            :disabled="loading"
          >
            {{ loading ? "Submitting Application..." : "Submit for Safety Evaluation" }}
          </button>
        </form>

        <!-- SUCCESS -->
        <div
          v-if="result"
          class="success-box"
          role="status"
        >
          {{ result }}
        </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { showToast } from "../utils/notifications";
import { ownerApplicationApi } from "../services/api";

const store = useStore();
const isAuthenticated = computed(() => store.getters["auth/isAuthenticated"]);
const currentUser = computed(() => store.state.auth.user);
const isOwnerAccount = computed(() => currentUser.value?.role === "owner");

const canApply = computed(() => isAuthenticated.value && isOwnerAccount.value);

const gateTitle = computed(() =>
  !isAuthenticated.value ? "Log in required" : "Owner account required",
);
const gateMessage = computed(() =>
  !isAuthenticated.value
    ? "Log in or sign up as an owner to submit an application."
    : "This application is for owner accounts. Sign up as an owner to continue.",
);

const applicationStatus = ref(null);

const statusIcon = computed(() => {
  switch (applicationStatus.value) {
    case "approved": return "\u2705";
    case "rejected": return "\u26A0\uFE0F";
    case "pending": return "\uD83D\uDD27";
    default: return "\uD83D\uDD27";
  }
});

const statusTitle = computed(() => {
  switch (applicationStatus.value) {
    case "approved": return "You're an approved owner";
    case "rejected": return "Application not approved";
    case "pending": return "Application pending review";
    default: return "Approval required";
  }
});

const statusMessage = computed(() => {
  switch (applicationStatus.value) {
    case "approved":
      return "Your owner account is fully approved \u2014 you can now list rentals from My Listings.";
    case "rejected":
      return "Your last application wasn't approved. You can update your details and resubmit below.";
    case "pending":
      return "We've received your application and it's awaiting review. You can update and resubmit your details below if anything changes.";
    default:
      return "Complete your details below and submit your application for review.";
  }
});

const loading = ref(false);
const result = ref("");

const form = reactive({
  fullName: "",
  email: "",
  phone: "",

  address: "",
  city: "",
  province: "",
  postalCode: "",

  bankName: "",
  accountHolder: "",
  accountNumber: "",
  accountType: "",
  branchCode: "",
});

const resetForm = () => {
  form.fullName = "";
  form.email = "";
  form.phone = "";

  form.address = "";
  form.city = "";
  form.province = "";
  form.postalCode = "";

  form.bankName = "";
  form.accountHolder = "";
  form.accountNumber = "";
  form.accountType = "";
  form.branchCode = "";
};

const submitOwnerApplication = async () => {
  loading.value = true;
  result.value = "";

  try {
    const data = await ownerApplicationApi.submit({ ...form });

    applicationStatus.value = data.application?.status || "pending";
    result.value = data.message;

    showToast(data.message, "success");

    resetForm();

    await store.dispatch("auth/refreshProfile");
  } catch (error) {
    showToast(
      error?.message || "Something went wrong. Please try again.",
      "error",
    );
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  if (!canApply.value) return;

  try {
    const data = await ownerApplicationApi.getMine();
    applicationStatus.value = data.application?.status || "not_submitted";

    if (data.application) {
      form.fullName = data.application.full_name || "";
      form.email = data.application.email || "";
      form.phone = data.application.phone || "";
    }
  } catch {
    applicationStatus.value = "not_submitted";
  }
});
</script>

<style scoped>
.owner-page {
  --green: #0b3b32;
  --green-deep: #062d28;
  --ink: #111827;
  --cream: #f7f3ea;
  --gold: #e99b13;
  --gold-soft: #f6c866;
  --white: #ffffff;
  --muted: #5f6875;
  --line: #e6dfd5;

  min-height: 100vh;
  color: var(--ink);

  background:
    radial-gradient(
      circle at top left,
      rgba(233, 155, 19, 0.14),
      transparent 20%
    ),
    linear-gradient(
      180deg,
      #f8f5ef 0%,
      #f4efe6 100%
    );
}

.owner-page .eyebrow {
  margin: 0 0 14px;
  color: var(--gold);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.owner-hero,
.benefits-section,
.steps-section,
.items-section,
.owner-form-section {
  max-width: 1200px;
  margin: 0 auto;
}

.owner-hero {
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  align-items: center;
  gap: 46px;
  padding: 72px 7% 30px;
}

.hero-copy h1 {
  max-width: 620px;
  margin: 0;

  font-size: clamp(3rem, 6vw, 5.5rem);
  line-height: 0.94;
  letter-spacing: -0.05em;
}

.hero-copy .lead {
  max-width: 620px;
  margin: 24px 0 0;

  color: var(--muted);
  font-size: 1.06rem;
  line-height: 1.75;
}

.hero-actions {
  margin-top: 26px;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
}

.primary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 50px;
  padding: 0 24px;

  border-radius: 999px;

  background: var(--green);
  color: var(--white);

  font-weight: 700;
  text-decoration: none;

  box-shadow: 0 15px 35px rgba(11, 59, 50, 0.18);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.primary-button:hover {
  transform: translateY(-2px);

  box-shadow: 0 18px 38px rgba(11, 59, 50, 0.24);
}

.mini-trust {
  color: var(--green);
  font-weight: 700;
  font-size: 0.88rem;
}

.hero-stats {
  margin-top: 28px;

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  max-width: 540px;
}

.hero-stats div {
  padding: 18px 20px;

  border-radius: 16px;
  border: 1px solid rgba(11, 59, 50, 0.08);

  background: rgba(255, 255, 255, 0.4);

  backdrop-filter: blur(2px);
}

.hero-stats strong {
  display: block;

  color: var(--green);
  font-size: 1.7rem;
  line-height: 1;
}

.hero-stats span {
  display: block;

  margin-top: 8px;

  color: var(--muted);
  font-size: 0.9rem;
}

.hero-visual {
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
}

.visual-frame {
  position: relative;

  width: min(100%, 500px);
  padding: 20px;

  border-radius: 24px;

  background: linear-gradient(
    135deg,
    rgba(233, 155, 19, 0.2),
    rgba(11, 59, 50, 0.08)
  );
}

.visual-frame::before {
  content: "";

  position: absolute;
  inset: 26px -18px -18px 24px;

  border-radius: 28px;

  background: rgba(11, 59, 50, 0.12);
}

.visual-frame img {
  position: relative;

  display: block;

  width: 100%;
  height: 420px;

  border-radius: 22px;

  object-fit: cover;

  box-shadow: 0 20px 45px rgba(17, 24, 39, 0.18);
}

.floating-card {
  position: absolute;
  right: 22px;
  bottom: 20px;

  display: grid;
  gap: 4px;

  padding: 20px 22px;

  border-radius: 18px;

  background: rgba(255, 255, 255, 0.96);

  box-shadow: 0 18px 36px rgba(17, 24, 39, 0.14);
}

.floating-card strong {
  color: var(--green);

  letter-spacing: 0.08em;
  text-transform: uppercase;

  font-size: 0.78rem;
}

.floating-card span {
  color: var(--ink);

  font-size: 1.05rem;
  font-weight: 700;
}

.floating-card small {
  color: var(--muted);
}

.benefits-section,
.steps-section,
.items-section,
.owner-form-section {
  padding: 34px 7% 0;
}

.section-heading {
  max-width: 1200px;

  display: flex;
  align-items: end;
  justify-content: space-between;

  gap: 30px;

  margin: 0 auto 26px;
}

.section-heading h2 {
  max-width: 760px;

  margin: 0;

  font-size: clamp(2.1rem, 4vw, 4rem);
  line-height: 0.95;

  letter-spacing: -0.04em;
}

.section-heading h2 span {
  color: var(--gold);
}

.section-heading > p {
  max-width: 420px;

  margin: 0;

  color: var(--muted);

  line-height: 1.7;
}

.benefits-grid {
  max-width: 1200px;

  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  gap: 22px;

  margin: 0 auto;

  padding-bottom: 20px;
}

.benefit-card,
.item-card {
  padding: 26px 22px;

  border-radius: 18px;
  border: 1px solid var(--line);

  background: rgba(255, 255, 255, 0.65);

  box-shadow: 0 16px 28px rgba(17, 24, 39, 0.03);
}

.benefit-card h3,
.item-card h3 {
  margin: 16px 0 8px;

  color: var(--green);

  font-size: 1.2rem;
}

.benefit-card p,
.item-card p {
  margin: 0;

  color: var(--muted);

  line-height: 1.65;
}

.benefit-icon,
.item-icon {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  width: 54px;
  height: 54px;

  border-radius: 14px;

  background: linear-gradient(
    135deg,
    rgba(233, 155, 19, 0.18),
    rgba(11, 59, 50, 0.08)
  );

  font-size: 1.5rem;
}

.steps-section {
  padding-top: 38px;
}

.step-heading {
  margin-bottom: 18px;
}

.steps-flow {
  max-width: 1200px;

  display: flex;
  align-items: stretch;
  justify-content: space-between;

  gap: 16px;

  margin: 0 auto;

  padding: 16px 0 24px;
}

.step-item {
  flex: 1;

  min-height: 190px;

  padding: 24px 20px;

  border: 1px solid var(--line);
  border-radius: 18px;

  background: var(--white);

  box-shadow: 0 16px 28px rgba(17, 24, 39, 0.03);
}

.step-number {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  min-width: 52px;
  height: 34px;

  border-radius: 999px;

  background: rgba(233, 155, 19, 0.18);

  color: var(--green);

  font-size: 0.76rem;
  font-weight: 800;

  letter-spacing: 0.08em;
}

.step-item strong {
  display: block;

  margin-top: 18px;

  color: var(--green);

  font-size: 1.1rem;
}

.step-item p {
  margin-top: 8px;

  color: var(--muted);

  line-height: 1.65;
}

.step-arrow {
  display: flex;

  align-items: center;
  justify-content: center;

  padding: 0 4px;

  color: var(--gold);

  font-size: 2.2rem;
  font-weight: 700;
}

.items-grid {
  max-width: 1200px;

  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  gap: 22px;

  margin: 0 auto;

  padding-bottom: 36px;
}

.owner-form-section {
  padding-bottom: 80px;
}

.owner-wrapper {
  max-width: 1000px;

  margin: 0 auto;

  padding: 34px;

  border: 1px solid var(--line);
  border-radius: 22px;

  background: rgba(255, 255, 255, 0.86);

  box-shadow: 0 18px 50px rgba(17, 24, 39, 0.05);
}

.owner-form {
  margin-top: 24px;

  display: flex;
  flex-direction: column;

  gap: 20px;
}

/* FORM SECTION HEADINGS */

.form-section-title {
  display: flex;
  align-items: flex-start;

  gap: 14px;

  margin-top: 10px;
  margin-bottom: 2px;

  padding-top: 10px;

  border-top: 1px solid var(--line);
}

.form-section-number {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  width: 38px;
  height: 38px;

  border-radius: 12px;

  background: rgba(233, 155, 19, 0.16);

  color: var(--green);

  font-size: 0.78rem;
  font-weight: 800;
}

.form-section-title h3 {
  margin: 0;

  color: var(--green);

  font-size: 1.25rem;
}

.form-section-title p {
  margin: 5px 0 0;

  color: var(--muted);

  font-size: 0.88rem;

  line-height: 1.5;
}

/* FORM */

.form-group {
  display: flex;
  flex-direction: column;

  gap: 8px;

  flex: 1;
}

.form-row {
  display: flex;

  gap: 20px;
}

.form-group label {
  color: var(--green);

  font-size: 0.9rem;
  font-weight: 700;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;

  box-sizing: border-box;

  border: 1px solid var(--line);
  border-radius: 12px;

  padding: 0 16px;

  color: var(--ink);

  background: #fff;

  font-size: 0.95rem;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.form-group input,
.form-group select {
  height: 50px;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;

  border-color: var(--gold);

  box-shadow: 0 0 0 3px rgba(233, 155, 19, 0.12);
}

.form-group small {
  color: var(--muted);

  font-size: 0.82rem;
}

.postal-group {
  max-width: 300px;
}

/* PRIVACY */

.privacy-note {
  display: flex;

  align-items: flex-start;

  gap: 14px;

  padding: 18px;

  border-radius: 16px;

  border: 1px solid rgba(11, 59, 50, 0.15);

  background: rgba(11, 59, 50, 0.045);
}

.privacy-icon {
  display: flex;

  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  width: 42px;
  height: 42px;

  border-radius: 12px;

  background: rgba(233, 155, 19, 0.15);

  font-size: 1.15rem;
}

.privacy-note strong {
  color: var(--green);

  font-size: 0.95rem;
}

.privacy-note p {
  margin: 5px 0 0;

  color: var(--muted);

  font-size: 0.84rem;

  line-height: 1.55;
}

/* SAFETY ALERTS */

.safety-alert {
  display: flex;

  gap: 14px;

  align-items: flex-start;

  padding: 18px;

  border-radius: 16px;

  border: 1px solid rgba(233, 155, 19, 0.32);

  background: linear-gradient(
    135deg,
    rgba(255, 249, 240, 0.9),
    rgba(246, 200, 102, 0.12)
  );
}

.safety-alert + .safety-alert {
  margin-top: 16px;
}

.safety-alert strong {
  color: var(--green);

  font-size: 0.98rem;
}

.safety-alert p {
  margin-top: 6px;

  color: var(--muted);

  line-height: 1.6;
}

.safety-icon {
  display: flex;

  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  width: 42px;
  height: 42px;

  border-radius: 12px;

  background: rgba(233, 155, 19, 0.18);

  font-size: 1.25rem;
}

/* BUTTON */

.full-width {
  width: 100%;
}

.btn-primary {
  min-height: 52px;

  padding: 0 20px;

  border: 0;
  border-radius: 12px;

  cursor: pointer;

  background: var(--green);

  color: var(--white);

  font: inherit;
  font-weight: 700;

  transition:
    transform 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);

  background: var(--green-deep);

  box-shadow: 0 12px 25px rgba(11, 59, 50, 0.18);
}

.btn-primary:disabled {
  cursor: not-allowed;

  opacity: 0.65;
}

/* SUCCESS */

.success-box {
  margin-top: 20px;

  padding: 16px 18px;

  border-radius: 16px;

  border: 1px solid rgba(11, 59, 50, 0.25);

  background: #edf9ee;

  color: var(--green);

  line-height: 1.6;
}

.success-box strong {
  color: var(--green);
}

/* TABLET */

@media (max-width: 1024px) {
  .owner-hero {
    grid-template-columns: 1fr;

    padding-top: 52px;
  }

  .hero-copy h1,
  .hero-copy .lead {
    max-width: none;
  }

  .benefits-grid,
  .items-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .steps-flow {
    flex-wrap: wrap;
  }

  .step-arrow {
    display: none;
  }
}

/* MOBILE */

@media (max-width: 768px) {
  .owner-hero,
  .benefits-section,
  .steps-section,
  .items-section,
  .owner-form-section {
    padding-left: 20px;
    padding-right: 20px;
  }

  .hero-stats {
    grid-template-columns: 1fr;
  }

  .benefits-grid,
  .items-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    flex-direction: column;
  }

  .hero-visual {
    margin-top: 8px;
  }

  .owner-wrapper {
    padding: 22px 18px;

    border-radius: 18px;
  }

  .section-heading {
    flex-direction: column;

    align-items: flex-start;
  }

  .step-item {
    min-height: unset;
  }

  .floating-card {
    right: 10px;
    bottom: 10px;

    padding: 16px;
  }

  .form-section-title {
    margin-top: 6px;
  }

  .postal-group {
    max-width: none;
  }
}
</style>