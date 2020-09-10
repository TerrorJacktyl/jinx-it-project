from django.test import TestCase

from .models import Portfolio, Page, Section
from account.models import Account
from django.contrib.auth.models import User

# Create your tests here.


class PortfolioModelTests(TestCase):

    def setUp(self):
        """Code run before each test. Create and link a portfolio to an existing account"""
        self.user = User.objects.create(username='jack', password='jack')
        self.account = Account.objects.create(user=self.user, first_name="Jack",
                                              last_name="OLantern", email="jacko@lanter.ns")
        self.portfolio = Portfolio.objects.create(
            owner=self.account, name="My First Portfolio")

    def test_portfolio_creation(self):
        """Tests the setUp code."""
        self.assertIsNotNone(Portfolio.objects.all())

    def test_add_page(self):
        """Add a page to the portfolio."""
        self.page = self.portfolio.page_set.create(
            name="Home page",
            number=1,
        )
        # check that we can access the new page from the portfolio
        self.assertIsNotNone(self.portfolio.page_set)

    def test_add_section(self):
        """Add multiple sections to the page."""
        self.test_add_page()
        self.section_about_me = self.page.section_set.create(
            name="About me",
            page=self.page,
            description="*looks at bugs* omaewamoushindeiru",
        )
        self.section_history = self.page.section_set.create(
            name="Professional history",
            page=self.page,
            description="NANI",
        )
        # check that both new sections were added and are accessible from the page
        self.assertIsNotNone(self.page.section_set)
        # None check before size check
        self.assertEqual(len(self.page.section_set.all()), 2)
